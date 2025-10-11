import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbType } from './utils/constants';
import { ValidationPipe } from '@nestjs/common';
// import { AnalyticsInterceptor } from './utils/interceptors/analytics.interceptor';
// import { ValidationErrorInterceptor } from './utils/interceptors/validation-error.interceptor';

async function bootstrap() {
  const appDataDb = (process.env.APP_DATA_DB as DbType) ?? DbType.IN_MEMORY;

  const app = await NestFactory.create(
    AppModule.register({
      analyticsDataDb: DbType.IN_MEMORY,
      appDataDb,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      //   disableErrorMessages: true,
    }),
  );

  //* Added
  //* AnalyticsInterceptor is expecting AnalysticsService
  //* but can't inject AnalyticsService because
  //* it has not been instantiated by the NestJS application
  //* so the useGlobalInterceptors can't be applied here
  //* for AnalyticsInterceptor
  /*app.useGlobalInterceptors(
    new AnalyticsInterceptor(),
    new ValidationErrorInterceptor(),
  );*/

  //~ This will allow closing DB even with CTRL+C
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
