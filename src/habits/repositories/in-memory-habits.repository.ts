import { ulid } from 'ulid';
import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

const HABITS = 'habits';

@Injectable()
export class InMemoryHabitsRepository {
  // private habits: any[] = [];

  //* Added
  constructor(private readonly db: InMemoryDbService) {}

  createHabit(createHabitInput) {
    const newHabit = {
      ...createHabitInput,
      id: ulid(),
    };

    // this.habits.push(newHabit);

    //return newHabit;
    return this.db.create(HABITS, newHabit);
  }

  findAllHabits() {
    // return this.habits;
    return this.db.findAll(HABITS);
  }
}
