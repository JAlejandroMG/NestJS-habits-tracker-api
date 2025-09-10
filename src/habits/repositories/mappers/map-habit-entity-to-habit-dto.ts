import { HabitDto } from 'src/habits/dto/habit.dto';
import { HabitEntity } from '../entities/habit.entity';

export const mapHabitEntityToHabitDto = (
  entity?: HabitEntity,
): HabitDto | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    description: entity.description,
    id: entity.habitId,
    name: entity.name,
  };
};
