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
import { HashingService } from 'src/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: AbstractUsersRepository,
    private readonly appConfigService: AppConfigService,
    private readonly hashingService: HashingService,
  ) {}

  //* Modified
  //   createUser(createUserInput: CreateUserInputDomain): SyncOrAsync<UserDomain> {
  async createUser(
    createUserInput: CreateUserInputDomain,
  ): Promise<UserDomain> {
    //* DRY should move to a private methode
    const passwordStrength = getPasswordStrength(createUserInput.password);

    //* DRY should move to a private methode
    if (passwordStrength === PasswordStrengthEnum.WEAK) {
      throw new ValidationError('Password too weak!');
    }

    //* Added
    const hashedPassword = await this.hashingService.hash(
      createUserInput.password,
    );

    //* Modified
    // return this.usersRepository.createUser(createUserInput);
    return this.usersRepository.createUser({
      ...createUserInput,
      password: hashedPassword,
    });
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

  //* Modified
  //   updateUser(
  async updateUser(
    updateUserInput: UpdatedUserInputDomain,
    //* Modified
    //   ): SyncOrAsync<Undefinable<UserDomain>> {
  ): Promise<Undefinable<UserDomain>> {
    //* Added
    if (updateUserInput.password) {
      //* DRY should move to a private methode
      const passwordStrength = getPasswordStrength(updateUserInput.password);

      //* DRY should move to a private methode
      if (passwordStrength === PasswordStrengthEnum.WEAK) {
        throw new ValidationError('Password too weak!');
      }

      const hashedPassword = await this.hashingService.hash(
        updateUserInput.password,
      );

      return this.usersRepository.updateUser({
        ...updateUserInput,
        password: hashedPassword,
      });
    }

    //* Modified
    return this.usersRepository.updateUser(updateUserInput);
  }
}
