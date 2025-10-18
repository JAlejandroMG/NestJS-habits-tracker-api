import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { RequestWithAdminUser } from 'src/utils/commonTypes/requestWithAdminUser.type';

@Injectable()
export class ApiKeyAuthorizationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithAdminUser>();
    const headers = request.headers;
    const apiKey = headers['x-api-key'];
    const adminUser = this.authService.getAdminUserByApiKey(apiKey as string);

    if (!adminUser) {
      throw new UnauthorizedException('Invalid API Keysss');
    }

    //~ Now that we have the adminUser data, we can add it to
    //~ the Request Object, so the other elements down the Request Cycle
    //~ will be able to get access to the adminUser data.
    //- This creates a coupling with admin-authorization.guars.ts
    request.adminUser = adminUser;

    return true;
  }
}
