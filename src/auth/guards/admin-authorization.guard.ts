import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessLevelEnum } from '../utils/acess-level.enum';
import { AppConfigService } from '../../app-config/app-config.service';
import { Reflector } from '@nestjs/core';
// import { GRANT_ACCESS_METADATA_KEY } from 'src/utils/constants';
import { Request } from 'express';
import { GrantAccess } from '../decorators/grant-access.decorator';

@Injectable()
export class AdminAuthorizationGuard implements CanActivate {
  private readonly accessMap: Map<AccessLevelEnum, (string | undefined)[]>;

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly reflector: Reflector,
  ) {
    const superUserKey = this.appConfigService.authenticationSuperUserApiKey;
    const systemUserKey = this.appConfigService.authenticationSystemUserApiKey;
    const supportUserKey =
      this.appConfigService.authenticationSupportUserApiKey;

    this.accessMap = new Map([
      [AccessLevelEnum.SUPER_USER, [superUserKey]],
      [AccessLevelEnum.SYSTEM_USER, [systemUserKey, superUserKey]],
      [
        AccessLevelEnum.SUPPORT_USER,
        [supportUserKey, systemUserKey, superUserKey],
      ],
    ]);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const accessLevel: AccessLevelEnum =
      //* Modified
      //* No longer neede because of the createDecorator method
      //* in grant-access.decorator.ts
      //   this.reflector.getAllAndOverride(GRANT_ACCESS_METADATA_KEY, [
      this.reflector.getAllAndOverride(GrantAccess, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AccessLevelEnum.SUPER_USER;
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];
    const isAuthorized = this.accessMap
      .get(accessLevel)
      ?.includes(apiKey as string | undefined);

    if (!isAuthorized) {
      throw new ForbiddenException(
        `Resource not accessible: you need at least ${accessLevel} acces level`,
      );
    }

    return true;
  }
}
