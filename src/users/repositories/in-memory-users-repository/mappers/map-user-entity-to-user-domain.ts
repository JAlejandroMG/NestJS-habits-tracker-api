import { UserEntity } from '../entities/user.entity';
import { UserDomain } from '../../../services/models/user.domain';
import { plainToInstance } from 'class-transformer';

export const mapUserEntityToUserDomain = (
  entity?: UserEntity,
): UserDomain | undefined => {
  if (!entity) {
    return undefined;
  }

  //~ This will take care of giving back only the properties
  //~ that have been exposed in user.domain.ts and
  //~ exclude everything else.
  return plainToInstance(
    UserDomain,
    { ...entity },
    { excludeExtraneousValues: true },
  );
};
