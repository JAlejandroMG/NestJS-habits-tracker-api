import { UpdateHabitInputDomain } from 'src/habits/services/models/update-habit-input.domain';
import { UpdateHabitDto } from '../dto/update-habit.dto';

export const mapUpdateHabitDtoToUpdateHabitInput = (
  id: string,
  updateHabitDto: UpdateHabitDto,
): UpdateHabitInputDomain => {
  return {
    ...updateHabitDto,
    habitId: id,
  };
};
