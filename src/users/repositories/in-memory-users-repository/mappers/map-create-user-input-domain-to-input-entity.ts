import { CreateEntityInput } from 'src/in-memory-db/models/create-entity-input.type';
import { CreateUserInputDomain } from 'src/users/services/models/create-user-input.domain';
import { UserEntity } from '../entities/user.entity';
import { ulid } from 'ulid';

export const mapCreateUserInputDomainToInputEntity = (
  createUserInput: CreateUserInputDomain,
): CreateEntityInput<UserEntity> => {
  const now = new Date();

  return {
    ...createUserInput,
    createdAt: now,
    updatedAt: now,
    userId: ulid(),
  };
};
