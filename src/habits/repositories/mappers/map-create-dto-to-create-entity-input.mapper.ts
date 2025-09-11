import { ulid } from 'ulid';

import { CreateHabitDto } from 'src/habits/dto/create-habit.dto';
import { CreateEntityInput } from '../../../../dist/in-memory-db/models/create-entity-input.type';
import { HabitEntity } from '../entities/habit.entity';

export const mapCreateHabitDtoToCreateEntityInput = (
  createHabitDto: CreateHabitDto,
): CreateEntityInput<HabitEntity> => {
  const now = new Date();

  return {
    ...createHabitDto,
    createdAt: now,
    habitId: ulid(),
    updatedAt: now,
  };
};
