import { HabitDomain } from 'src/habits/services/models/habit.domain';
import { TOrmHabitEntity } from '../entities/torm-habit.entity';

export const mapTOrmHabitEntityToHabitDomain = (
  entity?: TOrmHabitEntity | null,
): HabitDomain | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    description: entity.description,
    habitId: entity.id,
    name: entity.name,
  };
};
