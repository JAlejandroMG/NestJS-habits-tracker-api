import { ulid } from 'ulid';

import { CreateHabitInputDomain } from 'src/habits/services/models/create-habit-input.domain';
import { MongooseHabitEntity } from '../entities/mongooseDb-habit.entity';

export const mapCreateHabitDomainToCreateEntity = (
  createHabitInput: CreateHabitInputDomain,
): MongooseHabitEntity => {
  return {
    ...createHabitInput,
    habitId: ulid(),
  };
};
