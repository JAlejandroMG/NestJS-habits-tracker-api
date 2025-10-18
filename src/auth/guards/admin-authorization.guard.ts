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
// import { AdminUserDomainModel } from '../models/admin-user-domain.model';
import { AuthService } from '../auth.service';

//* Removed
/*type RequestWithAdminUser = Request & {
  adminUser: AdminUserDomainModel;
};*/

@Injectable()
export class AdminAuthorizationGuard implements CanActivate {
  //* Removed
  //   private readonly accessMap: Map<AccessLevelEnum, (string | undefined)[]>;

  constructor(
    private readonly appConfigService: AppConfigService,
    //* Added
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {
    //* Removed
    /*const superUserKey = this.appConfigService.superUserApiKey;
    const systemUserKey = this.appConfigService.systemUserApiKey;
    const supportUserKey = this.appConfigService.supportUserApiKey;*/
    //* Removed
    /*this.accessMap = new Map([
      [AccessLevelEnum.SUPER_USER, [superUserKey]],
      [AccessLevelEnum.SYSTEM_USER, [systemUserKey, superUserKey]],
      [
        AccessLevelEnum.SUPPORT_USER,
        [supportUserKey, systemUserKey, superUserKey],
      ],
    ]);*/
  }

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
    //* Removed
    // const request = context.switchToHttp().getRequest<RequestWithAdminUser>();
    //* Added
    //- This creates a coupling with api-key-authorization.guars.ts
    //~ To avoid that coupling we can use the auth.service.ts
    // const adminUser = request.adminUser;
    const apiKey = request.headers['x-api-key'];
    //* Added
    const adminUser = this.authService.getAdminUserByApiKey(apiKey as string);
    //* Modified
    /*const isAuthorized = this.accessMap
      .get(accessLevel)
      ?.includes(apiKey as string | undefined);*/
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
