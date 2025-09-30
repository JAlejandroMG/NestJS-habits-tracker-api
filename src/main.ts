import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbType } from './utils/constants';

async function bootstrap() {
  //* Added
  const appDataDb = (process.env.APP_DATA_DB as DbType) ?? DbType.IN_MEMORY;

  //   const app = await NestFactory.create(AppModule);
  //* Modified
  const app = await NestFactory.create(
    AppModule.register({
      analyticsDataDb: DbType.IN_MEMORY,
      appDataDb,
    }),
  );

  //~ This will allow closing DB even with CTRL+C
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
