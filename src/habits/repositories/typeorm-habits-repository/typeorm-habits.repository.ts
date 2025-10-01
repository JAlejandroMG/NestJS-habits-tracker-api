import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractHabitsRepository } from 'src/habits/services/habits.repository';
import { TOrmHabitEntity } from './entities/torm-habit.entity';
import { Repository } from 'typeorm';
import { findAllHabitDomainQuery } from 'src/habits/services/models/find-all-habit-domain.query';
import { HabitDomain } from 'src/habits/services/models/habit.domain';
import { mapTOrmHabitEntityToHabitDomain } from './mappers/map-torm-habit-entity-to-habit-domain';
import { CreateHabitInputDomain } from 'src/habits/services/models/create-habit-input.domain';
import { mapTOrmCreateHabitDomainToCreateEntity } from './mappers/map-torm-create-input-to-create-entity.mapper';
import { UpdateHabitInputDomain } from 'src/habits/services/models/update-habit-input.domain';
import { mapTOrmUpdateHabitDomainToUpdateEntityInput } from './mappers/map-torm-update-habit-input-to-update-entity';

@Injectable()
export class TypeOrmHabitsRepository implements AbstractHabitsRepository {
  constructor(
    @InjectRepository(TOrmHabitEntity)
    private readonly tOrmRepository: Repository<TOrmHabitEntity>,
  ) {}

  async createHabit(
    createHabitInput: CreateHabitInputDomain,
  ): Promise<HabitDomain> {
    const habitEntity = await this.tOrmRepository.save(
      mapTOrmCreateHabitDomainToCreateEntity(createHabitInput),
    );

    return mapTOrmHabitEntityToHabitDomain(habitEntity)!;
  }

  async findAllHabits(query: findAllHabitDomainQuery): Promise<HabitDomain[]> {
    const habitEntities = await this.tOrmRepository.find({
      take: query.limit,
      order: query.sortBy ? { [query.sortBy]: 'ASC' } : undefined,
    });

    return habitEntities.map(
      (habitEntity) => mapTOrmHabitEntityToHabitDomain(habitEntity)!,
    );
  }

  async findHabitById(habitId: string): Promise<HabitDomain | undefined> {
    const habitEntity = await this.tOrmRepository.findOne({
      where: { id: habitId },
    });

    return mapTOrmHabitEntityToHabitDomain(habitEntity);
  }

  async removeHabit(habitId: string): Promise<HabitDomain | undefined> {
    const habitEntity = await this.tOrmRepository.findOne({
      where: { id: habitId },
    });

    if (!habitEntity) {
      return undefined;
    }

    const result = await this.tOrmRepository.delete(habitId);

    if (result.affected === 0) {
      return undefined;
    }

    return mapTOrmHabitEntityToHabitDomain(habitEntity);
  }

  async updateHabit(
    updateHabitInput: UpdateHabitInputDomain,
  ): Promise<HabitDomain | undefined> {
    const habitEntity = await this.tOrmRepository.findOne({
      where: { id: updateHabitInput.habitId },
    });

    if (!habitEntity) {
      return undefined;
    }

    const updatedHabitEntity = await this.tOrmRepository.save({
      ...habitEntity,
      ...mapTOrmUpdateHabitDomainToUpdateEntityInput(updateHabitInput),
    });

    return mapTOrmHabitEntityToHabitDomain(updatedHabitEntity);
  }
}
