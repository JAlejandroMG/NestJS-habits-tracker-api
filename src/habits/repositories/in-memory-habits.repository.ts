import { ulid } from 'ulid';
import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

const HABITS = 'habits';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  createHabit(createHabitInput) {
    const newHabit = {
      ...createHabitInput,
      id: ulid(),
    };

    return this.db.create(HABITS, newHabit);
  }

  findAllHabits() {
    return this.db.findAll(HABITS);
  }

  findHabitById(id: string) {
    return this.db.findOneBy(HABITS, { id });
  }

  removeHabit(id: string) {
    return this.db.deleteOneBy(HABITS, { id });
  }

  updateHabit(id: string, updatedInput) {
    return this.db.updateOneBy(HABITS, { id }, updatedInput);
  }
}
