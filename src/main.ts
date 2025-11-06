import * as cors from 'cors';
import helmet from 'helmet';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DbType } from './utils/constants';

async function bootstrap() {
  const appDataDb = (process.env.APP_DATA_DB as DbType) ?? DbType.IN_MEMORY;

  const app = await NestFactory.create(
    AppModule.register({
      analyticsDataDb: DbType.IN_MEMORY,
      appDataDb,
    }),
    //* Added
    {
      //cors: true,
      /*cors: {
        origin: 'http//localhost:3000',
      },*/
    },
  );

  //* Added
  //   app.enableCors();
  /*app.enableCors({
    origin: 'http//localhost:3000',
  });*/

  //* Added
  /*app.use(cors());
  app.use(helmet());*/
  //~ The order they appear, is the same
  //~ they will be run in the Request cycle
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
