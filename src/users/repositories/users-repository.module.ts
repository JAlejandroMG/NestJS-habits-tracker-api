import { DynamicModule, Module } from '@nestjs/common';

import { DbType } from 'src/utils/constants';

import { InMemoryUsersRepositoryModule } from './in-memory-users-repository/in-memory-users-repository.module';

@Module({})
export class UsersRepositoryModule {
  static register(options: { dbType: DbType }): DynamicModule {
    let usersRepositoryModule;

    switch (options.dbType) {
      case DbType.IN_MEMORY:
        usersRepositoryModule = InMemoryUsersRepositoryModule;
        break;
      default:
        throw new Error(
          `UsersRepositoryModule does not support ${options.dbType}`,
        );
    }

    return {
      exports: [usersRepositoryModule],
      imports: [usersRepositoryModule],
      module: UsersRepositoryModule,
    };
  }
}
