import { ulid } from 'ulid';

import { CreateHabitInputDomain } from 'src/habits/services/models/create-habit-input.domain';
import { TOrmHabitEntity } from '../entities/torm-habit.entity';

export const mapTOrmCreateHabitDomainToCreateEntity = (
  createHabitInput: CreateHabitInputDomain,
): TOrmHabitEntity => {
  const habitEntity = new TOrmHabitEntity();

  habitEntity.description = createHabitInput.description;
  habitEntity.id = ulid();
  habitEntity.name = createHabitInput.name;

  return habitEntity;
};
