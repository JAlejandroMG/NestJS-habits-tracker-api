import { ValueProvider } from '@nestjs/common';
import { DB_SEED_DATA_TOKEN } from 'src/utils/constants';

export const SeedDataProvider: ValueProvider = {
  provide: DB_SEED_DATA_TOKEN,
  useValue: {
    habits: [
      {
        id: 1,
        habitId: 'a',
        name: 'drink water',
        description: 'drink 2L of water daily',
        createdAt: new Date('2025-01-02'),
        updatedAt: new Date('2025-01-03'),
      },
      {
        id: 2,
        habitId: 'b',
        name: 'sleep 8 hours',
        createdAt: new Date('2025-01-04'),
        updatedAt: new Date('2025-01-05'),
      },
      {
        id: 3,
        habitId: 'c',
        name: 'walk 5K',
        createdAt: new Date('2025-02-10'),
        updatedAt: new Date('2025-02-11'),
      },
    ],
  },
};
