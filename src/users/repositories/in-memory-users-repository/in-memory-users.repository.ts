import { Injectable } from '@nestjs/common';
import { InMemoryDbRepository } from 'src/in-memory-db/in-memory-db.repository';
import { UserDomain } from 'src/users/services/models/user.domain';
import { AbstractUsersRepository } from 'src/users/services/users.repository';
import { UserEntity } from './entities/user.entity';
import { CreateUserInputDomain } from 'src/users/services/models/create-user-input.domain';
import { mapCreateUserInputDomainToInputEntity } from './mappers/map-create-user-input-domain-to-input-entity';
import { mapUserEntityToUserDomain } from './mappers/map-user-entity-to-user-domain';
import { UpdatedUserInputDomain } from 'src/users/services/models/update-user-input.domain';
import { mapUpdatedUserDomainInputToEntityInput } from './mappers/map-updated-user-input-domain-to-input-entity';

@Injectable()
export class InMemoryUsersRepository implements AbstractUsersRepository {
  constructor(
    private readonly userInMemoryDb: InMemoryDbRepository<UserEntity>,
  ) {}

  createUser(createUserInput: CreateUserInputDomain): UserDomain {
    const userEntity = this.userInMemoryDb.create(
      mapCreateUserInputDomainToInputEntity(createUserInput),
    );

    return mapUserEntityToUserDomain(userEntity)!;
  }

  findAllUsers(query: {
    limit?: number;
    sortBy?: 'firstName' | 'lastName' | 'id';
  }): UserDomain[] {
    const userEntities = this.userInMemoryDb.findAll(query);

    return userEntities.map(
      (userEntity) => mapUserEntityToUserDomain(userEntity)!, //* This ! at the end avoids undefined
    );
  }

  findUserById(userId: string): UserDomain | undefined {
    const userEntity = this.userInMemoryDb.findOneBy({ userId });

    return mapUserEntityToUserDomain(userEntity);
  }

  //* Added
  findUserByUsername(userName: string): UserDomain | undefined {
    const userEntity = this.userInMemoryDb.findOneBy({ userName });

    return mapUserEntityToUserDomain(userEntity);
  }

  removeUser(userId: string): UserDomain | undefined {
    const userEntity = this.userInMemoryDb.deleteOneBy({
      userId,
    });

    return mapUserEntityToUserDomain(userEntity);
  }

  updateUser(updatedUserInput: UpdatedUserInputDomain): UserDomain | undefined {
    const userEntity = this.userInMemoryDb.updateOneBy(
      {
        userId: updatedUserInput.userId,
      },
      mapUpdatedUserDomainInputToEntityInput(updatedUserInput),
    );

    return mapUserEntityToUserDomain(userEntity);
  }
}
