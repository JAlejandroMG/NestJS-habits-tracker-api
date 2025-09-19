import { Injectable } from '@nestjs/common';

import { AnalyticsEntity } from './analytics.entity';
import { InMemoryDbRepository } from 'src/in-memory-db/in-memory-db.repository';
import { CreateAnalyticInputDomain } from './models/create-analytic-input.domain';

@Injectable()
export class AnalyticsService {
  constructor(private readonly db: InMemoryDbRepository<AnalyticsEntity>) {}

  saveAnalytics(input: CreateAnalyticInputDomain) {
    this.db.create({
      ...input,
      timestamp: new Date(),
    });
  }
}
