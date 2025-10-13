import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_METADATA_KEY } from 'src/utils/constants';

// export const IsPublic = (...args: string[]) => SetMetadata('is-public', args);
export const IsPublic = (isPublic: boolean) =>
  SetMetadata(IS_PUBLIC_METADATA_KEY, isPublic);
