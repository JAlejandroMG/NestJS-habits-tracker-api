import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbType } from './utils/constants';
import { ValidationPipe } from '@nestjs/common';
// import { ApiKeyAuthorizationGuard } from './auth/guards/api-key-authorization/api-key-authorization.guard';

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

  //~ This will allow closing DB even with CTRL+C
  app.enableShutdownHooks();

  //* Added
  //* Could also be applied Globally at Root Module in app.module.ts
  //   app.useGlobalGuards(new ApiKeyAuthorizationGuard());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
