import { DynamicModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { MongoConnectionModule } from './mongo-connection/mongo-connection.module';
import { DbType } from './utils/constants';

@Module({
  imports: [
    AnalyticsModule,
    AppConfigModule,
    //* Not needed anymore
    // HabitsModule
    //* Not needed anymore
    // HabitsModule.register({
    //   dbType: DbType.MONGO,
    // }),
    InMemoryDbModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => {
        return config.seedDataFilePath;
      },
    }),
    MongoConnectionModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //* As InMemoryDbModule and MongoConnectionModule are delared here
  //* then we need a core module where the DB can be defined in this case
  static register(options: { appDataDb: DbType }): DynamicModule {
    const { appDataDb } = options;

    return {
      imports: [HabitsModule.register({ dbType: appDataDb })],
      module: AppModule,
    };
  }
}
