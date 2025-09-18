import { Module } from '@nestjs/common';
// import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';
// import { seedDataFilePath } from '../utils/constants';
import { AnalyticsService } from './analytics.service';

@Module({
  exports: [AnalyticsService],
  imports: [
    //~ This won't be registered here, but in appModule
    /*InMemoryDbModule.register({
      seedDataFilePath,
    }),*/
  ],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
