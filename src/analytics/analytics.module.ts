import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';
import { ANALYTICS } from 'src/utils/constants';

@Module({
  exports: [AnalyticsService],
  imports: [
    InMemoryDbModule.forFeature({
      entityName: ANALYTICS,
    }),
  ],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
