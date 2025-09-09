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

@Controller(HABITS)
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.habitsService.remove(id);
  }

  @Get()
  //   findAll(@Query('limit') limit: string, @Query('sortBy') sortBy: string) {
  findAll(@Query() query) {
    const { limit, sortBy } = query;
    const limitNumber = limit ? +limit : undefined;

    return this.habitsService.findAll({ sortBy, limit: limitNumber });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const habit = this.habitsService.findOne(id);

    if (!habit) {
      throw new NotFoundException(`Habit with id: '${id}' has not been found`);
    }

    return habit;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input) {
    const habit = this.habitsService.update(id, input);

    if (!habit) {
      throw new NotFoundException(`Habit with id: '${id}' has not been found`);
    }

    return habit;
  }

  @Post()
  create(@Body() createHabitInput) {
    return this.habitsService.create(createHabitInput);
  }
}
