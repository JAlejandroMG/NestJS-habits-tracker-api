import { Module } from '@nestjs/common';
import { ConfigModule /*, ConfigService*/ } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';

@Module({
  imports: [
    InMemoryDbModule.forRootAsync({
      //   imports: [ConfigModule],
      //* Modified
      imports: [AppConfigModule],
      //   inject: [ConfigService],
      //* Modified
      inject: [AppConfigService],
      //   useFactory: async (config: ConfigService) => {
      //* Modified
      useFactory: (config: AppConfigService) => {
        // return config.get('SEED_DATA_FILE_PATH')!;
        //* Modified
        return config.seedDataFilePath;
      },
    }),
    AnalyticsModule,
    //* Moved to app-config.module.ts
    // ConfigModule.forRoot(),
    HabitsModule,
    //* Added
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
