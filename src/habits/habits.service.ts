import { Injectable } from '@nestjs/common';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';

@Injectable()
export class HabitsService {
  constructor(private readonly habitsRepository: InMemoryHabitsRepository) {}

  create(createHabitInput) {
    return this.habitsRepository.createHabit(createHabitInput);
  }

  //* Modified
  findAll(query: { limit?: number; sortBy?: string }) {
    const limit = query.limit ?? 10;
    const sortBy = query.sortBy ?? 'name';

    return this.habitsRepository.findAllHabits({ limit, sortBy });
  }

  findOne(id: string) {
    return this.habitsRepository.findHabitById(id);
  }

  remove(id: string) {
    return this.habitsRepository.removeHabit(id);
  }

  update(id: string, updatedInput) {
    return this.habitsRepository.updateHabit(id, updatedInput);
  }
}
