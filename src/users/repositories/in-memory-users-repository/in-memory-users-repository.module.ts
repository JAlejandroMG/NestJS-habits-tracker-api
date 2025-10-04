import { Module } from '@nestjs/common';

import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';
import { AbstractUsersRepository } from 'src/users/services/users.repository';
import { USERS } from 'src/utils/constants';

import { InMemoryUsersRepository } from './in-memory-users.repository';

@Module({
  exports: [AbstractUsersRepository],
  imports: [
    InMemoryDbModule.forFeature({
      entityName: USERS,
    }),
  ],
  providers: [
    {
      provide: AbstractUsersRepository,
      useClass: InMemoryUsersRepository,
    },
  ],
})
export class InMemoryUsersRepositoryModule {}
