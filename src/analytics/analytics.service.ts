import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { ANALYTICS_STORE } from 'src/utils/constants';
import { AnalyticsEntity } from './analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(private readonly db: InMemoryDbService) {}

  saveAnalytics(data: any) {
    this.db.create<AnalyticsEntity>(ANALYTICS_STORE, {
      ...data,
      timestamp: new Date(),
    });
  }
}
