import { UpdateEntityInput } from 'src/in-memory-db/models/update-entity-input.type';
import { UpdatedUserInputDomain } from 'src/users/services/models/update-user-input.domain';
import { UserEntity } from '../entities/user.entity';

export const mapUpdatedUserDomainInputToEntityInput = (
  updatedUserInput: UpdatedUserInputDomain,
): UpdateEntityInput<UserEntity> => {
  return {
    ...updatedUserInput,
    updatedAt: new Date(),
  };
};
