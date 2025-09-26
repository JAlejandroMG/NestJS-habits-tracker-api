import { HabitEntity } from '../entities/mdb-habit.entity';
import { UpdateHabitInputDomain } from 'src/habits/services/models/update-habit-input.domain';

export const mapUpdateHabitDomainToUpdateEntityInput = (
  updateHabitDomain: UpdateHabitInputDomain,
): Partial<HabitEntity> => {
  return {
    ...updateHabitDomain,
    updatedAt: new Date(),
  };
};
