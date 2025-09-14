import { Injectable } from '@nestjs/common';
import { InMemoryHabitsRepository } from '../repositories/in-memory-habits.repository';
// import { HabitDto } from './dto/habit.dto';
// import { CreateHabitDto } from './dto/create-habit.dto';
// import { UpdateHabitDto } from './dto/update-habit.dto';
import { HabitDomain } from './models/habit.domain';
import { CreateHabitInputDomain } from './models/create-habit-input.domain';
import { UpdateHabitInputDomain } from './models/update-habit-input.domain';

//* Modified
@Injectable()
export class HabitsService {
  constructor(private readonly habitsRepository: InMemoryHabitsRepository) {}

  create(
    createHabitInput: CreateHabitInputDomain,
  ): HabitDomain | Promise<HabitDomain> {
    return this.habitsRepository.createHabit(createHabitInput);
  }

  findAll(query: {
    limit?: number;
    sortBy?: 'name' | 'habitId';
  }): HabitDomain[] | Promise<HabitDomain[]> {
    const limit = query.limit ?? 10;
    const sortBy = query.sortBy ?? 'name';

    return this.habitsRepository.findAllHabits({ limit, sortBy });
  }

  findOne(
    id: string,
  ): HabitDomain | undefined | Promise<HabitDomain | undefined> {
    return this.habitsRepository.findHabitById(id);
  }

  remove(
    id: string,
  ): HabitDomain | undefined | Promise<HabitDomain | undefined> {
    return this.habitsRepository.removeHabit(id);
  }

  update(
    // id: string,
    updatedInput: UpdateHabitInputDomain,
  ): HabitDomain | undefined | Promise<HabitDomain | undefined> {
    return this.habitsRepository.updateHabit(
      /*id,*/ // updatedInput.habitId,
      updatedInput,
    );
  }
}
