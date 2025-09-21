import { Module } from '@nestjs/common';

import { HabitsController } from './controllers/habits.controller';
import { HabitsService } from './services/habits.service';
// import { InMemoryHabitsRepository } from './repositories/in-memory-habits-repository/in-memory-habits.repository';
// import { HABITS_STORE } from 'src/utils/constants';
// import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';
import { AppConfigModule } from 'src/app-config/app-config.module';
// import { AbstractHabitsRepository } from './services/habits.repository';
import { HabitsRepositoryModule } from './repositories/habits-repository.module';

@Module({
  controllers: [HabitsController],
  imports: [
    AppConfigModule,
    HabitsRepositoryModule,
    //* Removed in favor of in-memory-habits-repository.module.ts
    /*InMemoryDbModule.forFeature({
      entityName: HABITS_STORE,
    }),*/
  ],
  providers: [
    HabitsService,
    //* Removed
    // {
    //   provide: AbstractHabitsRepository,
    //   useClass: InMemoryHabitsRepository,
    // },
  ],
})
export class HabitsModule {}
