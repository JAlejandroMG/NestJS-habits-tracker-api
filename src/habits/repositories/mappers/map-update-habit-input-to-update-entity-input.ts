import { UpdateEntityInput } from 'src/in-memory-db/models/update-entity-input.type';
import { HabitEntity } from '../entities/habit.entity';
import { UpdateHabitInputDomain } from 'src/habits/services/models/update-habit-input.domain';

export const mapUpdateHabitDomainToUpdateEntityInput = (
  updateHabitDomain: UpdateHabitInputDomain,
): UpdateEntityInput<HabitEntity> => {
  return {
    ...updateHabitDomain,
    updatedAt: new Date(),
  };
};
