import { ulid } from 'ulid';

import { HabitEntity } from '../entities/mdb-habit.entity';
import { CreateHabitInputDomain } from 'src/habits/services/models/create-habit-input.domain';

export const mapCreateHabitDomainToCreateEntity = (
  createHabitInput: CreateHabitInputDomain,
): Omit<HabitEntity, '_id'> => {
  const now = new Date();

  return {
    ...createHabitInput,
    createdAt: now,
    habitId: ulid(),
    updatedAt: now,
  };
};
