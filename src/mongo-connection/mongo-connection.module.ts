import { DynamicModule, Module } from '@nestjs/common';
import { MongoCoreModule } from './mongo-core.module';
import { REPOSITORY_COLLECTION_NAME_TOKEN } from 'src/utils/constants';
import { MongoDbRepository } from './mongo.repository';

@Module({})
export class MongoConnectionModule {
  static forRoot(): DynamicModule {
    return {
      exports: [MongoCoreModule],
      global: true,
      imports: [MongoCoreModule],
      module: MongoConnectionModule,
    };
  }

  static forFeature(options: { collectionName: string }): DynamicModule {
    return {
      exports: [MongoDbRepository],
      module: MongoConnectionModule,
      providers: [
        {
          provide: REPOSITORY_COLLECTION_NAME_TOKEN,
          useValue: options.collectionName,
        },
        MongoDbRepository,
      ],
    };
  }
}
