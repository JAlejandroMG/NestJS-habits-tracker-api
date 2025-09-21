import { ulid } from 'ulid';

import { CreateEntityInput } from 'src/in-memory-db/models/create-entity-input.type';
import { HabitEntity } from '../entities/habit.entity';
import { CreateHabitInputDomain } from 'src/habits/services/models/create-habit-input.domain';

export const mapCreateHabitDomainToCreateEntityInput = (
  createHabitInput: CreateHabitInputDomain,
): CreateEntityInput<HabitEntity> => {
  const now = new Date();

  return {
    ...createHabitInput,
    createdAt: now,
    habitId: ulid(),
    updatedAt: now,
  };
};
