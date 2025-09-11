import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { HABITS } from 'src/utils/constants';
import { HabitDto } from '../dto/habit.dto';
import { HabitEntity } from './entities/habit.entity';
import { mapCreateHabitDtoToCreateEntityInput } from './mappers/map-create-dto-to-create-entity-input.mapper';
import { mapHabitEntityToHabitDto } from './mappers/map-habit-entity-to-habit-dto';
import { mapUpdateHabitDtoToUpdateEntityInput } from './mappers/map-update-habit-dto-to-update-entity-input';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { UpdateHabitDto } from '../dto/update-habit.dto';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  createHabit(createHabitInput: CreateHabitDto): HabitDto {
    const habitEntity = this.db.create<HabitEntity>(
      HABITS,
      mapCreateHabitDtoToCreateEntityInput(createHabitInput),
    );

    return mapHabitEntityToHabitDto(habitEntity)!;
  }

  findAllHabits(query: {
    limit?: number;
    sortBy?: 'name' | 'habitId';
  }): HabitDto[] {
    const habitEntities = this.db.findAll<HabitEntity>(HABITS, query);

    return habitEntities.map(
      (habitEntity) => mapHabitEntityToHabitDto(habitEntity)!, //* This ! at the end avoids undefined
    );
  }

  findHabitById(id: string): HabitDto | undefined {
    const habitEntity = this.db.findOneBy<HabitEntity>(HABITS, { habitId: id });

    return mapHabitEntityToHabitDto(habitEntity);
  }

  removeHabit(id: string): HabitDto | undefined {
    const habitEntity = this.db.deleteOneBy<HabitEntity>(HABITS, {
      habitId: id,
    });

    return mapHabitEntityToHabitDto(habitEntity);
  }

  updateHabit(id: string, updatedInput: UpdateHabitDto): HabitDto | undefined {
    const habitEntity = this.db.updateOneBy<HabitEntity>(
      HABITS,
      { habitId: id },
      mapUpdateHabitDtoToUpdateEntityInput(updatedInput),
    );

    return mapHabitEntityToHabitDto(habitEntity);
  }
}
