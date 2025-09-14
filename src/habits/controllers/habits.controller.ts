import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HabitsService } from '../services/habits.service';
import { HABITS } from 'src/utils/constants';
import { HabitDto } from './dto/habit.dto';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { mapHabitDomainToHabitDto } from './mappers/map-habit-domain-to-habit-dto';
import { mapUpdateHabitDtoToUpdateHabitInput } from './mappers/map-update-habit-dto-to-update-habit-input';
import { mapCreateHabitDtoToCreateHabitInput } from './mappers/map-create-habit-dto-create-to-habit-input';

//* Modified
@Controller(HABITS)
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string): void | Promise<void> {
    this.habitsService.remove(id);
  }

  @Get()
  //   findAll(
  async findAll(
    @Query('limit') limit: string,
    @Query('sortBy') sortBy: 'name' | 'habitId',
  ): Promise<HabitDto[]> {
    //   ): HabitDto[] | Promise<HabitDto[]> {
    //   findAll(@Query() query): HabitDto[] | Promise<HabitDto[]> {
    // const { limit, sortBy } = query;
    const limitNumber = limit ? +limit : undefined;
    const habits = await this.habitsService.findAll({
      sortBy,
      limit: limitNumber,
    });

    // return this.habitsService.findAll({ sortBy, limit: limitNumber });
    return habits.map((habit) => mapHabitDomainToHabitDto(habit)!);
  }

  @Get(':id')
  //   findOne(
  async findOne(@Param('id') id: string): Promise<HabitDto | undefined> {
    //   ): HabitDto | undefined | Promise<HabitDto | undefined> {
    const habit = await this.habitsService.findOne(id);

    if (!habit) {
      throw new NotFoundException(`Habit with id: '${id}' has not been found`);
    }

    // return habit;
    return mapHabitDomainToHabitDto(habit);
  }

  @Patch(':id')
  //   update(
  async update(
    @Param('id') id: string,
    @Body() input: UpdateHabitDto,
  ): Promise<HabitDto | undefined> {
    //   ): HabitDto | undefined | Promise<HabitDto | undefined> {
    // const habit = this.habitsService.update(id, input);
    const habit = await this.habitsService.update(
      mapUpdateHabitDtoToUpdateHabitInput(id, input),
    );

    if (!habit) {
      throw new NotFoundException(`Habit with id: '${id}' has not been found`);
    }

    // return habit;
    return mapHabitDomainToHabitDto(habit);
  }

  @Post()
  //   create(
  async create(@Body() createHabitInput: CreateHabitDto): Promise<HabitDto> {
    //   ): HabitDto | Promise<HabitDto> {
    const habit = await this.habitsService.create(
      mapCreateHabitDtoToCreateHabitInput(createHabitInput),
    );

    // return this.habitsService.create(createHabitInput);
    return mapHabitDomainToHabitDto(habit)!;
  }
}
