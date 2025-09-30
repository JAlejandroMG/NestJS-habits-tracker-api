import { HabitDomain } from 'src/habits/services/models/habit.domain';
import { MongooseHabitEntity } from '../entities/mongooseDb-habit.entity';

export const mapHabitEntityToHabitDomain = (
  entity?: MongooseHabitEntity | null,
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
