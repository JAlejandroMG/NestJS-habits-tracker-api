import { HabitDomain } from 'src/habits/services/models/habit.domain';
import { HabitDto } from '../dto/habit.dto';

export const mapHabitDomainToHabitDto = (
  habit: HabitDomain,
): HabitDto | undefined => {
  if (!habit) {
    return undefined;
  }

  return {
    description: habit.description,
    id: habit.habitId,
    name: habit.name,
  };
};
