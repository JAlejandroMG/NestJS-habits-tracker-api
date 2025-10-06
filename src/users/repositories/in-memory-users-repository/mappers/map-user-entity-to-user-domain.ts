import { UserEntity } from '../entities/user.entity';
import { UserDomain } from '../../../services/models/user.domain';

export const mapUserEntityToUserDomain = (
  entity?: UserEntity,
): UserDomain | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    email: entity.email,
    firstName: entity.firstName,
    lastName: entity.lastName,
    middleName: entity.middleName,
    password: entity.password,
    userId: entity.userId,
    userName: entity.userName,
  };
};
