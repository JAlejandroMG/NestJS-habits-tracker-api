import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { SeedDataProvider } from './seed-data.provider';
import {
  PERSIST_DATA_PATH_TOKEN,
  SEED_DATA_PATH_TOKEN,
} from 'src/utils/constants';

@Module({})
export class InMemoryDbModule {
  static forRoot(options: { seedDataFilePath: string }): DynamicModule {
    return {
      exports: [InMemoryDbService],
      global: true,
      module: InMemoryDbModule,
      providers: [
        InMemoryDbService,
        SeedDataProvider,
        {
          provide: SEED_DATA_PATH_TOKEN,
          useValue: options.seedDataFilePath,
        },
        {
          provide: PERSIST_DATA_PATH_TOKEN,
          useExisting: SEED_DATA_PATH_TOKEN,
        },
      ],
    };
  }
}
