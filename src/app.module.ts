import { DynamicModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DbType } from './utils/constants';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AnalyticsInterceptor } from './utils/interceptors/analytics.interceptor';
import { ValidationErrorInterceptor } from './utils/interceptors/validation-error.interceptor';

@Module({
  imports: [AnalyticsModule],
  controllers: [AppController],
  providers: [
    AppService,
    //~ this allows to inject dependencies in the Interceptors
    //~ NestJS will take care of injecting AnalyticsService
    //~ that comes from AnalyticsModule
    {
      provide: APP_INTERCEPTOR,
      useClass: AnalyticsInterceptor,
    },
    //~ Even with the same token, NestJS will apply different Interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: ValidationErrorInterceptor,
    },
  ],
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
