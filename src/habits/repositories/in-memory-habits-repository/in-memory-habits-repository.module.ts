import { Module } from '@nestjs/common';

import { InMemoryHabitsRepository } from './in-memory-habits.repository';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';
import { HABITS } from 'src/utils/constants';
import { AbstractHabitsRepository } from 'src/habits/services/habits.repository';

@Module({
  exports: [AbstractHabitsRepository],
  imports: [
    InMemoryDbModule.forFeature({
      entityName: HABITS,
    }),
  ],
  providers: [
    {
      provide: AbstractHabitsRepository,
      useClass: InMemoryHabitsRepository,
    },
  ],
})
export class InMemoryHabitsRepositoryModule {}
