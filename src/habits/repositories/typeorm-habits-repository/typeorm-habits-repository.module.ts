import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TOrmHabitEntity } from './entities/torm-habit.entity';
import { AbstractHabitsRepository } from 'src/habits/services/habits.repository';
import { TypeOrmHabitsRepository } from './typeorm-habits.repository';

@Module({
  exports: [AbstractHabitsRepository],
  imports: [TypeOrmModule.forFeature([TOrmHabitEntity])],
  providers: [
    {
      provide: AbstractHabitsRepository,
      useClass: TypeOrmHabitsRepository,
    },
  ],
})
export class TypeormHabitsRepositoryModule {}
