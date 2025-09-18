import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Module({
  exports: [AnalyticsService],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
