// import { SetMetadata } from '@nestjs/common';
// import { IS_PUBLIC_METADATA_KEY } from 'src/utils/constants';
import { SetAuthStrategy } from './set-auth-strategy.decorator';
import { AuthStrategyEnum } from '../models/auth-strategy.enum';

// export const IsPublic = (...args: string[]) => SetMetadata('is-public', args);
// export const IsPublic = (isPublic: boolean) =>
//   SetMetadata(IS_PUBLIC_METADATA_KEY, isPublic);
export const IsPublic = () => SetAuthStrategy(AuthStrategyEnum.NONE);
