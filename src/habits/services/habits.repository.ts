import { HabitDomain } from '../services/models/habit.domain';
import { CreateHabitInputDomain } from '../services/models/create-habit-input.domain';
import { UpdateHabitInputDomain } from '../services/models/update-habit-input.domain';
import { findAllHabitDomainQuery } from './models/find-all-habit-domain.query';
import { SyncOrAsync } from 'src/utils/commonTypes/sync-or-async.type';
import { Undefinable } from 'src/utils/commonTypes/undefinable.type';

export abstract class AbstractHabitsRepository {
  abstract createHabit(
    createHabitInput: CreateHabitInputDomain,
  ): SyncOrAsync<HabitDomain>;

  abstract findAllHabits(
    query: findAllHabitDomainQuery,
  ): SyncOrAsync<HabitDomain[]>;

  abstract findHabitById(id: string): SyncOrAsync<Undefinable<HabitDomain>>;

  abstract removeHabit(id: string): SyncOrAsync<Undefinable<HabitDomain>>;

  abstract updateHabit(
    updatedInput: UpdateHabitInputDomain,
  ): SyncOrAsync<Undefinable<HabitDomain>>;
}
