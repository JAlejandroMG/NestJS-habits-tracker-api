import { Module } from '@nestjs/common';

import { HabitsController } from './controllers/habits.controller';
import { HabitsService } from './services/habits.service';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';
import { HABITS_STORE } from 'src/utils/constants';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { AbstractHabitsRepository } from './services/habits.repository';

@Module({
  controllers: [HabitsController],
  imports: [
    AppConfigModule,
    InMemoryDbModule.forFeature({
      entityName: HABITS_STORE,
    }),
  ],
  providers: [
    HabitsService,
    {
      provide: AbstractHabitsRepository,
      useClass: InMemoryHabitsRepository,
    },
  ],
})
export class HabitsModule {}
