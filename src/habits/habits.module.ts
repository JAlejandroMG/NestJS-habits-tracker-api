import { Module } from '@nestjs/common';
import { HabitsController } from './controllers/habits.controller';
import { HabitsService } from './services/habits.service';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';
import { HABITS_STORE } from 'src/utils/constants';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';

@Module({
  controllers: [HabitsController],
  //* Added
  imports: [
    InMemoryDbModule.forFeature({
      entityName: HABITS_STORE,
    }),
  ],
  providers: [HabitsService, InMemoryHabitsRepository],
})
export class HabitsModule {}
