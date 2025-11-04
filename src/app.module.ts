import { DynamicModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DbType } from './utils/constants';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AnalyticsInterceptor } from './utils/interceptors/analytics.interceptor';
import { ValidationErrorFilter } from './utils/filters/validation-error.filter';
import { AuthModule } from './auth/auth.module';

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
    //* Won't need this with the ValidationErrorFilter
    //~ Even with the same token, NestJS will apply different Interceptors
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ValidationErrorInterceptor,
    // },
    {
      provide: APP_FILTER,
      useClass: ValidationErrorFilter,
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

    const usersModule = UsersModule.register({ dbType: appDataDb });

    return {
      imports: [
        AuthModule.withUsersModule(usersModule),
        CoreModule.forRoot({ dbTypes }),
        HabitsModule.register({ dbType: appDataDb }),
        usersModule,
      ],
      module: AppModule,
    };
  }
}
