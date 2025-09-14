import { CreateHabitInputDomain } from 'src/habits/services/models/create-habit-input.domain';
import { CreateHabitDto } from '../dto/create-habit.dto';

export const mapCreateHabitDtoToCreateHabitInput = (
  createHabitDto: CreateHabitDto,
): CreateHabitInputDomain => {
  return {
    ...createHabitDto,
  };
};
