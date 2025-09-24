import { Inject, Module, OnApplicationShutdown } from '@nestjs/common';
import { MongoClient } from 'mongodb';

import { MONGO_CLIENT_TOKEN, MONGO_DB_TOKEN } from 'src/utils/constants';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';

@Module({
  exports: [MONGO_DB_TOKEN],
  imports: [AppConfigModule],
  providers: [
    {
      inject: [AppConfigService],
      provide: MONGO_CLIENT_TOKEN,
      //* useValue: new MongoClient('mongodb://localhost:27017/habit-tracker'),
      useFactory: (appConfigService: AppConfigService) =>
        new MongoClient(appConfigService.mongoUri),
    },
    {
      inject: [MONGO_CLIENT_TOKEN],
      provide: MONGO_DB_TOKEN,
      useFactory: async (mongoClient: MongoClient) => {
        await mongoClient.connect();
        console.log('Opening mongo connection...');
        return mongoClient.db();
      },
    },
  ],
})
//* Hook to NestJS application life cycle
export class MongoCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(MONGO_CLIENT_TOKEN)
    private readonly mongoClient: MongoClient,
  ) {}

  onApplicationShutdown(/*signal?: string*/) {
    console.log('Closing mongo connection...');
    this.mongoClient.close();
  }
}
