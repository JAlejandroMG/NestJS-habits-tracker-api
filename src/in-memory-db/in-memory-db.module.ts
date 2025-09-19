import {
  DynamicModule,
  FactoryProvider,
  Module,
  ModuleMetadata,
} from '@nestjs/common';

import { InMemoryDbRepository } from './in-memory-db.repository';
import { InMemoryDbService } from './in-memory-db.service';
import { SeedDataProvider } from './seed-data.provider';
import {
  PERSIST_DATA_PATH_TOKEN,
  REPOSITORY_ENTITY_NAME_TOKEN,
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

  //* Added
  static forRootAsync(options: {
    useFactory: (...args: any) => Promise<string> | string;
    imports?: ModuleMetadata['imports'];
    inject?: FactoryProvider['inject'];
  }): DynamicModule {
    return {
      exports: [InMemoryDbService],
      global: true,
      imports: options.imports ?? [],
      module: InMemoryDbModule,
      providers: [
        InMemoryDbService,
        SeedDataProvider,
        {
          provide: SEED_DATA_PATH_TOKEN,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
        {
          provide: PERSIST_DATA_PATH_TOKEN,
          useExisting: SEED_DATA_PATH_TOKEN,
        },
      ],
    };
  }

  static forFeature(options: { entityName: string }): DynamicModule {
    return {
      exports: [InMemoryDbRepository],
      module: InMemoryDbModule,
      providers: [
        InMemoryDbRepository,
        {
          provide: REPOSITORY_ENTITY_NAME_TOKEN,
          useValue: options.entityName,
        },
      ],
    };
  }
}
