import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AnalyticsService } from './analytics/analytics.service';

@Controller()
export class AppController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    //* Added
    this.analyticsService.saveAnalytics({
      data: 15.35,
      message: 'Hello from the AppController',
    });

    return this.appService.getHello();
  }
}
