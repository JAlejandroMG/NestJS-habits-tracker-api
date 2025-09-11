import { Injectable } from '@nestjs/common';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';
import { HabitDto } from './dto/habit.dto';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Injectable()
export class HabitsService {
  constructor(private readonly habitsRepository: InMemoryHabitsRepository) {}

  //* Modified
  create(createHabitInput: CreateHabitDto): HabitDto | Promise<HabitDto> {
    return this.habitsRepository.createHabit(createHabitInput);
  }

  findAll(query: {
    limit?: number;
    sortBy?: 'name' | 'habitId';
  }): HabitDto[] | Promise<HabitDto[]> {
    const limit = query.limit ?? 10;
    const sortBy = query.sortBy ?? 'name';

    return this.habitsRepository.findAllHabits({ limit, sortBy });
  }

  findOne(id: string): HabitDto | undefined | Promise<HabitDto | undefined> {
    return this.habitsRepository.findHabitById(id);
  }

  remove(id: string): HabitDto | undefined | Promise<HabitDto | undefined> {
    return this.habitsRepository.removeHabit(id);
  }

  //* Modified
  update(
    id: string,
    updatedInput: UpdateHabitDto,
  ): HabitDto | undefined | Promise<HabitDto | undefined> {
    return this.habitsRepository.updateHabit(id, updatedInput);
  }
}
