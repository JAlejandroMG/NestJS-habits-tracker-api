import { Module } from '@nestjs/common';
import {
  MongooseHabitEntity,
  MongooseHabitEntitySchema,
} from './entities/mongooseDb-habit.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AbstractHabitsRepository } from 'src/habits/services/habits.repository';
import { MongooseHabitsRepository } from './mongoose-habits.repository';

@Module({
  exports: [AbstractHabitsRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: MongooseHabitEntity.name,
        schema: MongooseHabitEntitySchema,
      },
    ]),
  ],
  providers: [
    {
      provide: AbstractHabitsRepository,
      useClass: MongooseHabitsRepository,
    },
  ],
})
export class MongooseHabitsRepositoryModule {}
