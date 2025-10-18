import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
// import { AppConfigService } from 'src/app-config/app-config.service';
import { AuthService } from '../auth.service';
// import { AdminUserDomainModel } from '../models/admin-user-domain.model';

//* Removed
/*type RequestWithAdminUser = Request & {
  adminUser: AdminUserDomainModel;
};*/

@Injectable()
export class ApiKeyAuthorizationGuard implements CanActivate {
  constructor(
    //* Removed
    //~ This is injected through the App Module importing AppSonfigModule
    // private readonly appConfigService: AppConfigService,
    //* Added
    private readonly authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    //* Removed
    // const request = context.switchToHttp().getRequest<RequestWithAdminUser>();
    const headers = request.headers;
    //* Added
    const apiKey = headers['x-api-key'];
    //* Added
    const adminUser = this.authService.getAdminUserByApiKey(apiKey as string);

    //* Removed
    /*const apiKeys = [
      this.appConfigService.superUserApiKey,
      this.appConfigService.supportUserApiKey,
      this.appConfigService.systemUserApiKey,
    ];*/

    //~ This is authenticating that the user has at least one of the required API keys
    // if (!apiKeys.includes(headers['x-api-key'] as string)) {
    //* Added
    if (!adminUser) {
      throw new UnauthorizedException('Invalid API Keysss');
    }

    return true;
  }
}
