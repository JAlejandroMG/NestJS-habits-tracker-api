import { Injectable } from '@nestjs/common';
import { SyncOrAsync } from 'src/utils/commonTypes/sync-or-async.type';
import { UserDomain } from './models/user.domain';
import { Undefinable } from 'src/utils/commonTypes/undefinable.type';
import { AbstractUsersRepository } from './users.repository';
import { AppConfigService } from 'src/app-config/app-config.service';
import { CreateUserInputDomain } from './models/create-user-input.domain';
import { UpdatedUserInputDomain } from './models/update-user-input.domain';
import { getPasswordStrength } from 'src/utils/password-strength/get-password-strength';
import { PasswordStrengthEnum } from 'src/utils/password-strength/password-strength.enum';
import { ValidationError } from 'src/utils/exceptions/validation-error';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: AbstractUsersRepository,
    private readonly appConfigService: AppConfigService,
  ) {}

  createUser(createUserInput: CreateUserInputDomain): SyncOrAsync<UserDomain> {
    const passwordStrength = getPasswordStrength(createUserInput.password);

    if (passwordStrength === PasswordStrengthEnum.WEAK) {
      throw new ValidationError('Password too weak!');
    }

    return this.usersRepository.createUser(createUserInput);
  }

  findAllUsers(query: {
    limit?: number;
    sortBy?: 'firstName' | 'lastName' | 'id';
  }): SyncOrAsync<UserDomain[]> {
    const limit = query.limit ?? this.appConfigService.defaultLimit;
    const sortBy = query.sortBy ?? 'firstName';

    return this.usersRepository.findAllUsers({ limit, sortBy });
  }

  findOneUser(userId: string): SyncOrAsync<Undefinable<UserDomain>> {
    return this.usersRepository.findUserById(userId);
  }

  removeUser(userId: string): SyncOrAsync<Undefinable<UserDomain>> {
    return this.usersRepository.removeUser(userId);
  }

  updateUser(
    updateUserInput: UpdatedUserInputDomain,
  ): SyncOrAsync<Undefinable<UserDomain>> {
    return this.usersRepository.updateUser(updateUserInput);
  }
}
