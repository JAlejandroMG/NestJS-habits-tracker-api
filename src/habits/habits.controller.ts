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
} from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.habitsService.remove(id);
  }

  @Get()
  findAll() {
    return this.habitsService.findAll();
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
