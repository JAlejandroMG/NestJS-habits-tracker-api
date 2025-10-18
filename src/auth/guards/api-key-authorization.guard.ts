import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyAuthorizationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headers = request.headers;
    const apiKey = headers['x-api-key'];
    const adminUser = this.authService.getAdminUserByApiKey(apiKey as string);

    if (!adminUser) {
      throw new UnauthorizedException('Invalid API Keysss');
    }

    return true;
  }
}
