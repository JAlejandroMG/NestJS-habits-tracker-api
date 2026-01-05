import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigService } from '../../app-config/app-config.service';
import { AbstractHabitsRepository as HabitsRepository } from './habits.repository';
import { HabitsService } from './habits.service';

describe('HabitsService', () => {
  const appConfigService = createMock<AppConfigService>({
    get defaultLimit() {
      return 10;
    },
  });
  const habitsRepository = createMock<HabitsRepository>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let habitService: HabitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HabitsService,
        {
          provide: AppConfigService,
          useValue: appConfigService,
        },
        {
          provide: HabitsRepository,
          useValue: habitsRepository,
        },
      ],
    }).compile();

    habitService = module.get<HabitsService>(HabitsService);
  });
});
