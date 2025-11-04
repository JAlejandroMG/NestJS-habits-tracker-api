import { SyncOrAsync } from 'src/utils/commonTypes/sync-or-async.type';
import { Undefinable } from 'src/utils/commonTypes/undefinable.type';
import { UserDomain } from './models/user.domain';
import { CreateUserInputDomain } from './models/create-user-input.domain';
import { FindAllUsersQueryDomain } from './models/find-all-users-query.domain';
import { UpdatedUserInputDomain } from './models/update-user-input.domain';

export abstract class AbstractUsersRepository {
  abstract createUser(
    createUserInput: CreateUserInputDomain,
  ): SyncOrAsync<UserDomain>;

  abstract findAllUsers(
    query: FindAllUsersQueryDomain,
  ): SyncOrAsync<UserDomain[]>;

  abstract findUserById(id: string): SyncOrAsync<Undefinable<UserDomain>>;

  abstract findUserByUsername(
    userName: string,
  ): SyncOrAsync<Undefinable<UserDomain>>;

  abstract removeUser(id: string): SyncOrAsync<Undefinable<UserDomain>>;

  abstract updateUser(
    updateUserInput: UpdatedUserInputDomain,
  ): SyncOrAsync<Undefinable<UserDomain>>;
}
