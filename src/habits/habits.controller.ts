import { Controller, Get /*, Inject*/ } from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}
  //~ @Inject(HabitsService)
  //~ private readonly habitService: HabitsService;

  @Get()
  findAll() {
    //~1 const habitsService = new HabitsService();

    //~1 return habitsService.findAll();
    return this.habitsService.findAll();
  }
}
