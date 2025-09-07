import { Injectable } from '@nestjs/common';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';

@Injectable()
export class HabitsService {
  constructor(private readonly habitsRepository: InMemoryHabitsRepository) {}

  //* Added
  create(createHabitInput) {
    return this.habitsRepository.createHabit(createHabitInput);
  }

  findAll() {
    return this.habitsRepository.findAllHabits();
  }
}
