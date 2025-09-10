import { ulid } from 'ulid';

import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { HABITS } from 'src/utils/constants';
import { HabitDto } from '../dto/habit.dto';
import { HabitEntity } from './entities/habit.entity';

//* Modified
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

    return this.db.create(HABITS, newHabit);
  }

  findAllHabits(query: { limit?: number; sortBy?: string }): HabitDto[] {
    return this.db.findAll(HABITS, query);
  }

  findHabitById(id: string): HabitDto | undefined {
    return this.db.findOneBy(HABITS, { id });
  }

  removeHabit(id: string): HabitDto | undefined {
    return this.db.deleteOneBy(HABITS, { id });
  }

  updateHabit(id: string, updatedInput): HabitDto | undefined {
    return this.db.updateOneBy(
      HABITS,
      { id },
      { ...updatedInput, updatedAt: new Date() },
    );
  }
}
