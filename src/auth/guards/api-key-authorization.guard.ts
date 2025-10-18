import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { RequestWithAdminUser } from 'src/utils/commonTypes/requestWithAdminUser.type';

@Injectable()
export class ApiKeyAuthorizationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithAdminUser>();
    const headers = request.headers;
    const apiKey = headers['x-api-key'];
    const adminUser = await this.authService.getAdminUserByApiKey(
      apiKey as string,
    );

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
