import { DynamicModule, Module } from '@nestjs/common';

import { HabitsController } from './controllers/habits.controller';
import { HabitsService } from './services/habits.service';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { HabitsRepositoryModule } from './repositories/habits-repository.module';
import { DbType } from 'src/utils/constants';

@Module({
  controllers: [HabitsController],
  imports: [AppConfigModule],
  providers: [HabitsService],
})
export class HabitsModule {
  static register(options: { dbType: DbType }): DynamicModule {
    return {
      imports: [HabitsRepositoryModule.register({ dbType: options.dbType })],
      module: HabitsModule,
    };
  }
}
