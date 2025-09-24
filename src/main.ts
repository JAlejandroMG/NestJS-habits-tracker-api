import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* This will allow closing DB even with CTRL+C
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);

  //* DELETE - Just for demo purpose only
  /*await new Promise((resolve) => setTimeout(resolve, 200));
//   console.log('Shutting down...');
  await app.close();*/
}
bootstrap();
