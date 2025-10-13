import { DynamicModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DbType } from './utils/constants';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER, /* APP_GUARD,*/ APP_INTERCEPTOR } from '@nestjs/core';
import { AnalyticsInterceptor } from './utils/interceptors/analytics.interceptor';
import { ValidationErrorFilter } from './utils/filters/validation-error.filter';
// import { ApiKeyAuthorizationGuard } from './auth/guards/api-key-authorization/api-key-authorization.guard';
// import { AppConfigModule } from './app-config/app-config.module';
// import { ValidationErrorInterceptor } from './utils/interceptors/validation-error.interceptor';
import { AuthModule } from './auth/auth.module';

@Module({
  //* Added
  imports: [AnalyticsModule, AuthModule /*, AppConfigModule*/],
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
    //* Added
    //* Could also be applied Globally in an independent module auth.mod
    /*{
      provide: APP_GUARD,
      useClass: ApiKeyAuthorizationGuard,
    },*/
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
