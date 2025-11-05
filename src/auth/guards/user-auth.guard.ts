/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { IS_PUBLIC_METADATA_KEY } from 'src/utils/constants';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    //~ To verify the access token sent as part of the Request
    private readonly jwtService: JwtService,
    //~ To check if the Endpoint is Public or not
    private reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorizationHeader: string = request.headers.authorization;

    console.log('user-auth.guard-authorizationHeader', authorizationHeader);

    //~ From our API client we expect an authorization header with following format
    //+ "Bearer <AccessToken>"
    const [type, token] = authorizationHeader?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid access token');
    }

    //~ Verify the JWT Token
    try {
      //~ This payload will be like accessToken in auth.service.ts
      const payload = await this.jwtService.verifyAsync(token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const user = await this.userService.findUserByUsername(payload.username);

      if (!user) {
        throw new UnauthorizedException('Invalid access token');
      }

      request.user = user;
    } catch (error) {
      throw new UnauthorizedException(`Invalid access: ${error.message}`);
    }

    return true;
  }
}
