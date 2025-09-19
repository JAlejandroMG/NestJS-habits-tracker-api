import { Injectable } from '@nestjs/common';
import { HabitEntity } from './entities/habit.entity';
import { mapCreateHabitDomainToCreateEntityInput } from './mappers/map-create-input-to-create-entity-input.mapper';
import { mapHabitEntityToHabitDomain } from './mappers/map-habit-entity-to-habit-domain';
import { mapUpdateHabitDomainToUpdateEntityInput } from './mappers/map-update-habit-input-to-update-entity-input';
import { HabitDomain } from '../services/models/habit.domain';
import { CreateHabitInputDomain } from '../services/models/create-habit-input.domain';
import { UpdateHabitInputDomain } from '../services/models/update-habit-input.domain';
import { InMemoryDbRepository } from 'src/in-memory-db/in-memory-db.repository';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbRepository<HabitEntity>) {}

  createHabit(createHabitInput: CreateHabitInputDomain): HabitDomain {
    const habitEntity = this.db.create(
      mapCreateHabitDomainToCreateEntityInput(createHabitInput),
    );

    return mapHabitEntityToHabitDomain(habitEntity)!;
  }

  findAllHabits(query: {
    limit?: number;
    sortBy?: 'name' | 'habitId';
  }): HabitDomain[] {
    const habitEntities = this.db.findAll(query);

    return habitEntities.map(
      (habitEntity) => mapHabitEntityToHabitDomain(habitEntity)!, //* This ! at the end avoids undefined
    );
  }

  findHabitById(id: string): HabitDomain | undefined {
    const habitEntity = this.db.findOneBy({
      habitId: id,
    });

    return mapHabitEntityToHabitDomain(habitEntity);
  }

  removeHabit(id: string): HabitDomain | undefined {
    const habitEntity = this.db.deleteOneBy({
      habitId: id,
    });

    return mapHabitEntityToHabitDomain(habitEntity);
  }

  updateHabit(updatedInput: UpdateHabitInputDomain): HabitDomain | undefined {
    const habitEntity = this.db.updateOneBy(
      { habitId: updatedInput.habitId },
      mapUpdateHabitDomainToUpdateEntityInput(updatedInput),
    );

    return mapHabitEntityToHabitDomain(habitEntity);
  }
}
