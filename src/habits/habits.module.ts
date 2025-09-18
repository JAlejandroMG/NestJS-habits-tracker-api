import { Module } from '@nestjs/common';
import { HabitsController } from './controllers/habits.controller';
import { HabitsService } from './services/habits.service';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';
// import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';
// import { seedDataFilePath } from '../utils/constants';

@Module({
  controllers: [HabitsController],
  imports: [
    //* Modified
    //~ This won't be registered here, but in appModule
    /*InMemoryDbModule.register({
      seedDataFilePath,
    }),*/
  ],
  providers: [HabitsService, InMemoryHabitsRepository],
})
export class HabitsModule {}
