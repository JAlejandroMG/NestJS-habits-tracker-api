import * as fs from 'fs';

import { FactoryProvider /*, ValueProvider*/ } from '@nestjs/common';
import { DB_SEED_DATA_TOKEN, SEED_DATA_PATH_TOKEN } from 'src/utils/constants';

const dateReviver = (key: string, value: any) => {
  const isDate =
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value);

  return isDate ? new Date(value) : value;
};

export const SeedDataProvider: FactoryProvider = {
  provide: DB_SEED_DATA_TOKEN,
  useFactory: async (seedDataPath: string) => {
    const fileContent = await fs.promises.readFile(seedDataPath, 'utf8');

    return JSON.parse(fileContent, dateReviver);
  },
  inject: [SEED_DATA_PATH_TOKEN],
};
