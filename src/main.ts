import * as cors from 'cors';
import helmet from 'helmet';
// import { json } from 'express';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DbType } from './utils/constants';
// import { catchMaliciousInput } from './utils/middleware/catch-malicious-input.middleware';

async function bootstrap() {
  const appDataDb = (process.env.APP_DATA_DB as DbType) ?? DbType.IN_MEMORY;

  const app = await NestFactory.create(
    AppModule.register({
      analyticsDataDb: DbType.IN_MEMORY,
      appDataDb,
    }),
  );

  //~ The order they appear, is the same
  //~ they will be run in the Request cycle.
  //~ For custom middleware
  //~ When the Request first arrives to the NestJS application
  //~ there is no body property in the Request object
  //~ because the data is received in form of a stream
  //~ that needs to be converted into a json object
  //* But when middleware is consumed inside a NestModule,
  //* NestJS already run some default middleware first
  //* such as parsing the body to JSON, or URL parameters
  //* so therefore calling json() is no longer required here
  //   app.use(cors(), helmet(), json(), catchMaliciousInput);
  //* Modified to apply only to habits controller
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cors(), helmet());

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

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
