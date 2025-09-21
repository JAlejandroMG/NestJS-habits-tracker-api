import { Module } from '@nestjs/common';

import { HabitsController } from './controllers/habits.controller';
import { HabitsService } from './services/habits.service';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { HabitsRepositoryModule } from './repositories/habits-repository.module';

@Module({
  controllers: [HabitsController],
  imports: [AppConfigModule, HabitsRepositoryModule],
  providers: [HabitsService],
})
export class HabitsModule {}
