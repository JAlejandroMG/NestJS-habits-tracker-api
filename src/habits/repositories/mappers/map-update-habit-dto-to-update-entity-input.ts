import { UpdateHabitDto } from 'src/habits/dto/update-habit.dto';
import { UpdateEntityInput } from 'src/in-memory-db/models/update-entity-input.type';
import { HabitEntity } from '../entities/habit.entity';

export const mapUpdateHabitDtoToUpdateEntityInput = (
  updateHabitDto: UpdateHabitDto,
): UpdateEntityInput<HabitEntity> => {
  return {
    ...updateHabitDto,
    updatedAt: new Date(),
  };
};
