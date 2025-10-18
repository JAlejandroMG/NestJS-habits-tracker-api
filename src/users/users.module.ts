import { DynamicModule, Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersRepositoryModule } from './repositories/users-repository.module';
import { DbType } from 'src/utils/constants';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { HashingModule } from 'src/hashing/hashing.module';

@Module({
  controllers: [UsersController],
  //* Added
  imports: [AppConfigModule, HashingModule],
  providers: [UsersService],
})
export class UsersModule {
  static register(options: { dbType: DbType }): DynamicModule {
    return {
      imports: [UsersRepositoryModule.register({ dbType: options.dbType })],
      module: UsersModule,
    };
  }
}
