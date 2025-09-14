// import { UpdateHabitDto } from 'src/habits/controllers/dto/update-habit.dto';
import { UpdateEntityInput } from 'src/in-memory-db/models/update-entity-input.type';
import { HabitEntity } from '../entities/habit.entity';
import { UpdateHabitInputDomain } from 'src/habits/services/models/update-habit-input.domain';

//* Modified
export const mapUpdateHabitDomainToUpdateEntityInput = (
  updateHabitDomain: UpdateHabitInputDomain,
): UpdateEntityInput<HabitEntity> => {
  return {
    ...updateHabitDomain,
    updatedAt: new Date(),
  };
};
