import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiKeyAuthorizationGuard } from './api-key-authorization.guard';
import { AdminAuthorizationGuard } from './admin-authorization.guard';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_METADATA_KEY } from 'src/utils/constants';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly authenticationGuard: ApiKeyAuthorizationGuard,
    private readonly authorizationGuard: AdminAuthorizationGuard,
    //~ This service allows to get access to the metadata inside all classes
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //~ First parameter is the Metadata property name, and te second is an array
    const isPublic: boolean = this.reflector.getAllAndOverride(
      IS_PUBLIC_METADATA_KEY,
      //~ First checks for the specific Handler, ant then for the Controller
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    return (
      this.authenticationGuard.canActivate(context) &&
      this.authorizationGuard.canActivate(context)
    );
  }
}
