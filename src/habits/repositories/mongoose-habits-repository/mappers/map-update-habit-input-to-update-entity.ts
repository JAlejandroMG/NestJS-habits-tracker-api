import { UpdateHabitInputDomain } from 'src/habits/services/models/update-habit-input.domain';
import { MongooseHabitEntity } from '../entities/mongooseDb-habit.entity';

export const mapUpdateHabitDomainToUpdateEntityInput = (
  updateHabitDomain: UpdateHabitInputDomain,
): Partial<MongooseHabitEntity> => {
  return {
    ...updateHabitDomain,
  };
};
