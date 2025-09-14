import { HabitDomain } from 'src/habits/services/models/habit.domain';
import { HabitEntity } from '../entities/habit.entity';

export const mapHabitEntityToHabitDomain = (
  entity?: HabitEntity,
): HabitDomain | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    description: entity.description,
    // id: entity.habitId,
    habitId: entity.habitId,
    name: entity.name,
  };
};
