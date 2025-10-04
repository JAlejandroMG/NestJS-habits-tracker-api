import { DynamicModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DbType } from './utils/constants';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AnalyticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: {
    analyticsDataDb: DbType;
    appDataDb: DbType;
  }): DynamicModule {
    const { analyticsDataDb, appDataDb } = options;
    const dbTypes = Array.from(new Set([analyticsDataDb, appDataDb]));

    return {
      imports: [
        CoreModule.forRoot({ dbTypes }),
        HabitsModule.register({ dbType: appDataDb }),
        UsersModule.register({ dbType: appDataDb }),
      ],
      module: AppModule,
    };
  }
}
