import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InMemoryHabitsRepository } from '../repositories/in-memory-habits.repository';
import { HabitDomain } from './models/habit.domain';
import { CreateHabitInputDomain } from './models/create-habit-input.domain';
import { UpdateHabitInputDomain } from './models/update-habit-input.domain';

@Injectable()
export class HabitsService {
  constructor(
    //* Added
    private readonly configService: ConfigService,
    private readonly habitsRepository: InMemoryHabitsRepository,
  ) {}

  create(
    createHabitInput: CreateHabitInputDomain,
  ): HabitDomain | Promise<HabitDomain> {
    return this.habitsRepository.createHabit(createHabitInput);
  }

  findAll(query: {
    limit?: number;
    sortBy?: 'name' | 'habitId';
  }): HabitDomain[] | Promise<HabitDomain[]> {
    //* Modified
    const defaultLimit: string | undefined =
      this.configService.get('DEFAULT_LIMIT');
    // const limit = query.limit ?? parseInt(process.env.DEFAULT_LIMIT ?? '4');
    const limit = query.limit ?? parseInt(defaultLimit ?? '4');
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
    updatedInput: UpdateHabitInputDomain,
  ): HabitDomain | undefined | Promise<HabitDomain | undefined> {
    return this.habitsRepository.updateHabit(updatedInput);
  }
}
