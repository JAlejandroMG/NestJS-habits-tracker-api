// import { SetMetadata } from '@nestjs/common';
import { AccessLevelEnum } from '../models/acess-level.enum';
// import { GRANT_ACCESS_METADATA_KEY } from 'src/utils/constants';
import { Reflector } from '@nestjs/core';

// export const GrantAccess = (...args: string[]) => SetMetadata('grant-access', args);
/*export const GrantAccess = (accessLevel: AccessLevelEnum) =>
  SetMetadata(GRANT_ACCESS_METADATA_KEY, accessLevel);*/
//~ This is an alternative way of creating a Decorator
//~ GRANT_ACCESS_METADATA_KEY is no longer needed.
export const GrantAccess = Reflector.createDecorator<AccessLevelEnum>();
