import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessLevelEnum } from '../models/acess-level.enum';
import { AppConfigService } from '../../app-config/app-config.service';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { GrantAccess } from '../decorators/grant-access.decorator';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminAuthorizationGuard implements CanActivate {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const accessLevel: AccessLevelEnum | undefined =
      //~ No longer neede because of the createDecorator method
      //~ in grant-access.decorator.ts
      //   this.reflector.getAllAndOverride(GRANT_ACCESS_METADATA_KEY, [
      this.reflector.getAllAndOverride(GrantAccess, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AccessLevelEnum.SUPER_USER;
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];
    const adminUser = this.authService.getAdminUserByApiKey(apiKey as string);
    const isAuthorized =
      adminUser && this.hasRequiredAccess(adminUser.accessLevel, accessLevel);

    if (!isAuthorized) {
      throw new ForbiddenException(
        `Resource not accessible: you need at least ${accessLevel} acces level`,
      );
    }

    return true;
  }

  private hasRequiredAccess(
    userLevel: AccessLevelEnum,
    requiredLevel: AccessLevelEnum,
  ): boolean {
    const accessHierarchy = [
      AccessLevelEnum.SUPPORT_USER,
      AccessLevelEnum.SYSTEM_USER,
      AccessLevelEnum.SUPER_USER,
    ];

    const userLevelIndex = accessHierarchy.indexOf(userLevel);
    const requiredLevelIndex = accessHierarchy.indexOf(requiredLevel);

    return userLevelIndex >= requiredLevelIndex;
  }
}
