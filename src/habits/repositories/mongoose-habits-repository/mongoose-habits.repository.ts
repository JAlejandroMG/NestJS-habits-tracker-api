import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractHabitsRepository } from 'src/habits/services/habits.repository';
import { MongooseHabitEntity } from './entities/mongooseDb-habit.entity';
import { Model } from 'mongoose';
import { findAllHabitDomainQuery } from 'src/habits/services/models/find-all-habit-domain.query';
import { HabitDomain } from 'src/habits/services/models/habit.domain';
import { mapHabitEntityToHabitDomain } from './mappers/map-mongoose-habit-entity-to-habit-domain';
import { mapCreateHabitDomainToCreateEntity } from './mappers/map-mongoose-create-input-to-create-entity.mapper';
import { CreateHabitInputDomain } from 'src/habits/services/models/create-habit-input.domain';
import { UpdateHabitInputDomain } from 'src/habits/services/models/update-habit-input.domain';
import { mapUpdateHabitDomainToUpdateEntityInput } from './mappers/map-update-habit-input-to-update-entity';

@Injectable()
export class MongooseHabitsRepository implements AbstractHabitsRepository {
  constructor(
    @InjectModel(MongooseHabitEntity.name)
    private readonly mongooseHabitModel: Model<MongooseHabitEntity>,
  ) {}

  async createHabit(
    createHabitInput: CreateHabitInputDomain,
  ): Promise<HabitDomain> {
    const habitEntity = await this.mongooseHabitModel.create(
      mapCreateHabitDomainToCreateEntity(createHabitInput),
    );

    return habitEntity;
  }

  async findAllHabits(query: findAllHabitDomainQuery): Promise<HabitDomain[]> {
    const habits = await this.mongooseHabitModel
      .find()
      .limit(query.limit ?? 10)
      .sort(query.sortBy);

    return habits.map((habit) => mapHabitEntityToHabitDomain(habit)!);
  }

  async findHabitById(habitId: string): Promise<HabitDomain | undefined> {
    const habitEntity = await this.mongooseHabitModel.findOne({ habitId });

    return mapHabitEntityToHabitDomain(habitEntity);
  }

  async removeHabit(habitId: string): Promise<HabitDomain | undefined> {
    const habitEntity = await this.mongooseHabitModel.findOneAndDelete({
      habitId,
    });

    return mapHabitEntityToHabitDomain(habitEntity);
  }

  async updateHabit(
    updatedInput: UpdateHabitInputDomain,
  ): Promise<HabitDomain | undefined> {
    const habitEntity = await this.mongooseHabitModel.findOneAndUpdate(
      {
        habitId: updatedInput.habitId,
      },
      mapUpdateHabitDomainToUpdateEntityInput(updatedInput),
      {
        returnDocument: 'after',
      },
    );

    return mapHabitEntityToHabitDomain(habitEntity);
  }
}
