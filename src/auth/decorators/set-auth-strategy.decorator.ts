// import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthStrategyEnum } from '../models/auth-strategy.enum';

// export const SetAuthStrategy = (...args: string[]) => SetMetadata('set-auth-strategy', args);
export const SetAuthStrategy = Reflector.createDecorator<AuthStrategyEnum>();
