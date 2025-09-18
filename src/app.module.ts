import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';
import { seedDataFilePath } from './utils/constants';

@Module({
  //* Modified
  //~ DB Module will be registered here to make it global
  //~ instead of doing it in each child module
  imports: [
    HabitsModule,
    AnalyticsModule,
    InMemoryDbModule.forRoot({
      seedDataFilePath,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
