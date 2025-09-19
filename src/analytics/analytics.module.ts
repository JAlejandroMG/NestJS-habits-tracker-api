import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';
import { ANALYTICS_STORE } from 'src/utils/constants';

@Module({
  exports: [AnalyticsService],
  imports: [
    InMemoryDbModule.forFeature({
      entityName: ANALYTICS_STORE,
    }),
  ],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
