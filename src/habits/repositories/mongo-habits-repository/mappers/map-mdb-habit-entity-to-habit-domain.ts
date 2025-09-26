import { HabitDomain } from 'src/habits/services/models/habit.domain';
import { HabitEntity } from '../entities/mdb-habit.entity';

export const mapHabitEntityToHabitDomain = (
  entity?: HabitEntity | null,
): HabitDomain | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    description: entity.description,
    habitId: entity.habitId,
    name: entity.name,
  };
};
