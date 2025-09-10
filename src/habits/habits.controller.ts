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
import { HabitsService } from './habits.service';
import { HABITS } from 'src/utils/constants';
import { HabitDto } from './dto/habit.dto';

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
  //   findAll(@Query('limit') limit: string, @Query('sortBy') sortBy: string): HabitDto[] |Promise<HabitDto[]> {
  findAll(@Query() query): HabitDto[] | Promise<HabitDto[]> {
    const { limit, sortBy } = query;
    const limitNumber = limit ? +limit : undefined;

    return this.habitsService.findAll({ sortBy, limit: limitNumber });
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): HabitDto | undefined | Promise<HabitDto | undefined> {
    const habit = this.habitsService.findOne(id);

    if (!habit) {
      throw new NotFoundException(`Habit with id: '${id}' has not been found`);
    }

    return habit;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() input,
  ): HabitDto | undefined | Promise<HabitDto | undefined> {
    const habit = this.habitsService.update(id, input);

    if (!habit) {
      throw new NotFoundException(`Habit with id: '${id}' has not been found`);
    }

    return habit;
  }

  @Post()
  create(@Body() createHabitInput): HabitDto | Promise<HabitDto> {
    return this.habitsService.create(createHabitInput);
  }
}
