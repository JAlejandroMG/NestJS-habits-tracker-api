import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { SeedDataProvider } from './models/providers/seed-data.provider';
import {
  PERSIST_DATA_PATH_TOKEN,
  SEED_DATA_PATH_TOKEN,
} from 'src/utils/constants';

@Module({
  //~ Pass this configuration down inside DynamicModule
  /*exports: [InMemoryDbService],
  providers: [
    InMemoryDbService,
    SeedDataProvider,
    {
      provide: SEED_DATA_PATH_TOKEN,
      useValue: 'fixtures/seed-data.json',
    },
    {
      provide: PERSIST_DATA_PATH_TOKEN,
      useExisting: SEED_DATA_PATH_TOKEN,
    },
  ],*/
})
export class InMemoryDbModule {
  //* Added
  //   static register(options: { seedDataFilePath: string }): DynamicModule {
  //~ Convention for Dynamic Modules that are meant to be registered just once
  static forRoot(options: { seedDataFilePath: string }): DynamicModule {
    return {
      exports: [InMemoryDbService],
      //~ Make the returned DB Module global
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
