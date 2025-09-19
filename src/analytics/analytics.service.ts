import { Injectable } from '@nestjs/common';
// import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
// import { ANALYTICS_STORE } from 'src/utils/constants';
import { AnalyticsEntity } from './analytics.entity';
import { InMemoryDbRepository } from 'src/in-memory-db/in-memory-db.repository';
import { CreateAnalyticInputDomain } from './models/create-analytic-input.domain';

@Injectable()
export class AnalyticsService {
  //* Modified
  //   constructor(private readonly db: InMemoryDbService) {}
  constructor(private readonly db: InMemoryDbRepository<AnalyticsEntity>) {}

  //+ TO DO - Add mappers for input data and returned models
  //* Modified
  //   saveAnalytics(data: any) {
  saveAnalytics(input: CreateAnalyticInputDomain) {
    //* Modified
    // this.db.create<AnalyticsEntity>(ANALYTICS_STORE, {
    this.db.create({
      ...input,
      timestamp: new Date(),
    });
  }
}
