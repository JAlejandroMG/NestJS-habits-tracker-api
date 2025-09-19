import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';
// import { seedDataFilePath } from './utils/constants';

const getInMemoryDbModule = async () => {
  await ConfigModule.envVariablesLoaded;

  return InMemoryDbModule.forRoot({
    seedDataFilePath: process.env.SEED_DATA_FILE_PATH!,
  });
};

@Module({
  imports: [
    getInMemoryDbModule(),
    AnalyticsModule,
    ConfigModule.forRoot(),
    HabitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
