import { UpdateHabitInputDomain } from 'src/habits/services/models/update-habit-input.domain';
import { TOrmHabitEntity } from '../entities/torm-habit.entity';

export const mapTOrmUpdateHabitDomainToUpdateEntityInput = (
  updateHabitDomain: UpdateHabitInputDomain,
): Partial<TOrmHabitEntity> => {
  return {
    ...updateHabitDomain,
  };
};
