import { ulid } from 'ulid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryHabitsRepository {
  private habits: any[] = [];

  createHabit(createHabitInput) {
    const newHabit = {
      ...createHabitInput,
      id: ulid(),
    };

    this.habits.push(newHabit);

    return newHabit;
  }

  findAllHabits() {
    return this.habits;
  }
}
