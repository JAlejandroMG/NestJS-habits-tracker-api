import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { SetAuthStrategy } from 'src/auth/decorators/set-auth-strategy.decorator';
import { AuthStrategyEnum } from 'src/auth/models/auth-strategy.enum';
import { AdminAuthGuard } from '../admin-auth.guard';
import { UserAuthGuard } from '../user-auth.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  //~ With reflector we can access controler and handler Metadata
  constructor(
    private readonly adminAuthGuard: AdminAuthGuard,
    private readonly reflector: Reflector,
    private readonly userAuthGuard: UserAuthGuard,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const strategy =
      this.reflector.getAllAndOverride<AuthStrategyEnum>(
        //~ This is the Metadata we want to access to
        SetAuthStrategy,
        [context.getHandler(), context.getClass()],
      ) ?? AuthStrategyEnum.ADMIN_API_KEY;
    //~ If there is no Metadata, we default to Admin access

    switch (strategy) {
      case AuthStrategyEnum.NONE:
        return true;
      case AuthStrategyEnum.USERT_JWT:
        return this.userAuthGuard.canActivate(context);
      case AuthStrategyEnum.ADMIN_API_KEY:
        return this.adminAuthGuard.canActivate(context);
      default:
        return this.adminAuthGuard.canActivate(context);
    }
  }
}
