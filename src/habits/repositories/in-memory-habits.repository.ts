import { ulid } from 'ulid';

import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { HABITS } from 'src/utils/constants';
import { HabitDto } from '../dto/habit.dto';
import { HabitEntity } from './entities/habit.entity';
import { mapHabitEntityToHabitDto } from './mappers/map-habit-entity-to-habit-dto';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  createHabit(createHabitInput): HabitDto {
    const now = new Date();
    const newHabit: HabitEntity = {
      ...createHabitInput,
      createdAt: now,
      //id: ulid(),
      habitId: ulid(),
      updatedAt: now,
    };
    const habitEntity = this.db.create<HabitEntity>(HABITS, newHabit);

    return mapHabitEntityToHabitDto(habitEntity)!;
  }

  findAllHabits(query: { limit?: number; sortBy?: string }): HabitDto[] {
    const habitEntities = this.db.findAll<HabitEntity>(HABITS, query);

    return habitEntities.map(
      (habitEntity) => mapHabitEntityToHabitDto(habitEntity)!, //* This ! at the end avoids undefined
    );
  }

  findHabitById(id: string): HabitDto | undefined {
    const habitEntity = this.db.findOneBy<HabitEntity>(HABITS, { id });

    return mapHabitEntityToHabitDto(habitEntity);
  }

  removeHabit(id: string): HabitDto | undefined {
    const habitEntity = this.db.deleteOneBy<HabitEntity>(HABITS, { id });

    return mapHabitEntityToHabitDto(habitEntity);
  }

  updateHabit(id: string, updatedInput): HabitDto | undefined {
    const habitEntity = this.db.updateOneBy<HabitEntity>(
      HABITS,
      { id },
      { ...updatedInput, updatedAt: new Date() },
    );

    return mapHabitEntityToHabitDto(habitEntity);
  }
}
