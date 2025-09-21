import { HabitDomain } from '../services/models/habit.domain';
import { CreateHabitInputDomain } from '../services/models/create-habit-input.domain';
import { UpdateHabitInputDomain } from '../services/models/update-habit-input.domain';
import { findAllHabitDomainQuery } from './models/find-all-habit-domain.query';
import { SyncOrAsync } from 'src/utils/commonTypes/sync-or-async.type';
import { Undefinable } from 'src/utils/commonTypes/undefinable.type';

//* Modified
export abstract class AbstractHabitsRepository {
  //   abstract createHabit(createHabitInput: CreateHabitInputDomain): HabitDomain;
  abstract createHabit(
    createHabitInput: CreateHabitInputDomain,
  ): SyncOrAsync<HabitDomain>;

  /*abstract findAllHabits(query: {
    limit?: number;
    sortBy?: 'name' | 'habitId';
  }): HabitDomain[];*/
  //   abstract findAllHabits(query: findAllHabitDomainQuery): HabitDomain[];
  abstract findAllHabits(
    query: findAllHabitDomainQuery,
  ): SyncOrAsync<HabitDomain[]>;

  //   abstract findHabitById(id: string): HabitDomain | undefined;
  abstract findHabitById(id: string): SyncOrAsync<Undefinable<HabitDomain>>;

  //   abstract removeHabit(id: string): HabitDomain | undefined;
  abstract removeHabit(id: string): SyncOrAsync<Undefinable<HabitDomain>>;

  abstract updateHabit(
    updatedInput: UpdateHabitInputDomain,
  ): SyncOrAsync<Undefinable<HabitDomain>>;
  //   ): HabitDomain | undefined;
}
