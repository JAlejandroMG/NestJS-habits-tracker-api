import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';

@Module({
  imports: [
    InMemoryDbModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return config.get('SEED_DATA_FILE_PATH')!;
      },
    }),
    AnalyticsModule,
    ConfigModule.forRoot(),
    HabitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
