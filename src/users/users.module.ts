import { DynamicModule, Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersRepositoryModule } from './repositories/users-repository.module';
import { DbType } from 'src/utils/constants';
import { AppConfigModule } from 'src/app-config/app-config.module';

@Module({
  controllers: [UsersController],
  imports: [AppConfigModule],
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
