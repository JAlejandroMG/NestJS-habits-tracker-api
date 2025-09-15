import { Module } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { SeedDataProvider } from './models/providers/seed-data.provider';
import {
  PERSIST_DATA_PATH_TOKEN,
  SEED_DATA_PATH_TOKEN,
} from 'src/utils/constants';

@Module({
  exports: [InMemoryDbService],
  providers: [
    InMemoryDbService,
    SeedDataProvider,
    {
      provide: SEED_DATA_PATH_TOKEN,
      useValue: 'fixtures/seed-data.json',
    },
    //* Added
    {
      provide: PERSIST_DATA_PATH_TOKEN,
      //   useValue: 'fixtures/backup.json',
      useExisting: SEED_DATA_PATH_TOKEN,
    },
  ],
})
export class InMemoryDbModule {}
