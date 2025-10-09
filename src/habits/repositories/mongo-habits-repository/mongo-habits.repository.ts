import { Injectable } from '@nestjs/common';
import { AbstractHabitsRepository } from 'src/habits/services/habits.repository';
import { MongoDbRepository } from 'src/mongo-connection/mongo.repository';
import { HabitEntity } from './entities/mdb-habit.entity';
import { findAllHabitDomainQuery } from 'src/habits/services/models/find-all-habit-domain.query';
import { HabitDomain } from 'src/habits/services/models/habit.domain';
// import { FindAllQuery } from 'src/mongo-connection/models/mdb-find-all-query.type';
import { mapHabitEntityToHabitDomain } from './mappers/map-mdb-habit-entity-to-habit-domain';
import { mapCreateHabitDomainToCreateEntity } from './mappers/map-mdb-create-input-to-create-entity.mapper';
import { CreateHabitInputDomain } from 'src/habits/services/models/create-habit-input.domain';
import { mapUpdateHabitDomainToUpdateEntityInput } from './mappers/map-update-habit-input-to-update-entity';
import { UpdateHabitInputDomain } from 'src/habits/services/models/update-habit-input.domain';
import { MongoServerError } from 'mongodb';
import { ValidationError } from 'src/utils/exceptions/validation-error';

const MONGO_DUPLICATE_KEY_ERROR = 11000;

@Injectable()
export class MongoHabitsRepository implements AbstractHabitsRepository {
  constructor(private readonly mDbRepository: MongoDbRepository<HabitEntity>) {}

  async createHabit(
    createHabitInput: CreateHabitInputDomain,
  ): Promise<HabitDomain> {
    //* Modified
    try {
      const habitEntity = await this.mDbRepository.create(
        mapCreateHabitDomainToCreateEntity(createHabitInput),
      );

      return mapHabitEntityToHabitDomain(habitEntity)!;
    } catch (error) {
      if (
        error instanceof MongoServerError &&
        error.code === MONGO_DUPLICATE_KEY_ERROR
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const duplicateField = Object.keys(error.keyValue)[0];
        throw new ValidationError(
          `Habit with ${duplicateField} already exists`,
        );
      }
      throw error;
    }
  }

  async findAllHabits(query: findAllHabitDomainQuery): Promise<HabitDomain[]> {
    //* Not needed
    // const sortBy: FindAllQuery<HabitEntity>['sortBy'] =
    //   query.sortBy === 'id' ? 'habitId' : query.sortBy;
    const habitEntities = await this.mDbRepository.findAll({
      limit: query.limit,
      sortBy: query.sortBy,
      //   sortBy,
    });

    return habitEntities.map(
      (habitEntity) => mapHabitEntityToHabitDomain(habitEntity)!,
    );
  }

  async findHabitById(habitId: string): Promise<HabitDomain | undefined> {
    const habitEntity = await this.mDbRepository.findOneBy({ habitId });

    return mapHabitEntityToHabitDomain(habitEntity);
  }

  async removeHabit(habitId: string): Promise<HabitDomain | undefined> {
    const habitEntity = await this.mDbRepository.deleteOneBy({ habitId });

    return mapHabitEntityToHabitDomain(habitEntity);
  }

  async updateHabit(
    updatedInput: UpdateHabitInputDomain,
  ): Promise<HabitDomain | undefined> {
    const habitEntity = await this.mDbRepository.updateOneBy(
      { habitId: updatedInput.habitId },
      mapUpdateHabitDomainToUpdateEntityInput(updatedInput),
    );

    return mapHabitEntityToHabitDomain(habitEntity);
  }
}
