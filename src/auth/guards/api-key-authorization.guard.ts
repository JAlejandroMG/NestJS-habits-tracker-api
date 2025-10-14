import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app-config/app-config.service';

@Injectable()
export class ApiKeyAuthorizationGuard implements CanActivate {
  constructor(
    //~ This is injected through the App Module importing AppSonfigModule
    private readonly appConfigService: AppConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headers = request.headers;

    const apiKeys = [
      this.appConfigService.authenticationSuperUserApiKey,
      this.appConfigService.authenticationSupportUserApiKey,
      this.appConfigService.authenticationSystemUserApiKey,
    ];

    //~ This is authenticating that the user has at least one of the required API keys
    if (!apiKeys.includes(headers['x-api-key'] as string)) {
      throw new UnauthorizedException('Invalid API Keysss');
    }

    return true;
  }
}
