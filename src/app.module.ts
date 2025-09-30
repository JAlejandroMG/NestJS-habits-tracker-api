import { DynamicModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
// import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';
// import { AppConfigService } from './app-config/app-config.service';
// import { MongoConnectionModule } from './mongo-connection/mongo-connection.module';
import { DbType } from './utils/constants';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    AnalyticsModule,
    //* Moved to DynamicModule
    // CoreModule,
    //* Moved to core.module.ts
    // InMemoryDbModule.forRootAsync({
    //   imports: [AppConfigModule],
    //   inject: [AppConfigService],
    //   useFactory: (config: AppConfigService) => {
    //     return config.seedDataFilePath;
    //   },
    // }),
    //* Moved to core.module.ts
    // MongoConnectionModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //* Added
  static register(options: {
    analyticsDataDb: DbType;
    appDataDb: DbType;
  }): DynamicModule {
    const { analyticsDataDb, appDataDb } = options;
    const dbTypes = Array.from(new Set([analyticsDataDb, appDataDb]));

    return {
      imports: [
        //* Added
        // CoreModule.forRoot({ dbTypes: [appDataDb] }),
        //*Modified
        CoreModule.forRoot({ dbTypes }),
        HabitsModule.register({ dbType: appDataDb }),
      ],
      module: AppModule,
    };
  }
}
