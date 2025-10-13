import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app-config/app-config.service';
import { IS_PUBLIC_METADATA_KEY } from 'src/utils/constants';

@Injectable()
export class ApiKeyAuthorizationGuard implements CanActivate {
  constructor(
    //~ This is injected through the App Module importing AppSonfigModule
    private readonly appConfigService: AppConfigService,
    //* Added
    //~ This service allows to get access to the metadata inside all classes
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //* Added
    //~ First parameter is the Metadata property name, and te second is the Class
    /*const isPublic: boolean = this.reflector.get(
      'is-public',
      //   context.getClass(),
      //* Modified
      //* Instead of the Controller, this checks for the specific Handler
      context.getHandler(),
    );*/
    //~ First parameter is the Metadata property name, and te second is an array
    const isPublic: boolean = this.reflector.getAllAndOverride(
      IS_PUBLIC_METADATA_KEY,
      //* Added
      //* First checks for the specific Handler, ant then for the Controller
      [context.getHandler(), context.getClass()],
    );

    //* Added
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const headers = request.headers;

    if (headers['x-api-key'] !== '1234567890') {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
