import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AnalyticsService } from './analytics/analytics.service';
import { IsPublic } from './auth/decorators/is-public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly appService: AppService,
  ) {}

  @IsPublic()
  @Get()
  getHello(): string {
    this.analyticsService.saveAnalytics({
      data: 15.35,
      message: 'Hello from the AppController',
    });

    return this.appService.getHello();
  }
}
