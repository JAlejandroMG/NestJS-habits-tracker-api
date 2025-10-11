import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { AnalyticsService } from 'src/analytics/analytics.service';

@Injectable()
export class AnalyticsInterceptor implements NestInterceptor {
  constructor(private readonly analyticsService: AnalyticsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request: { method: string } = context.switchToHttp().getRequest();
    const statTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response: { statusCode: number } = context
          .switchToHttp()
          .getResponse();
        const endTime = Date.now();
        const responseTime = endTime - statTime;

        this.analyticsService.saveAnalytics({
          controller: context.getClass().name,
          handler: context.getHandler().name,
          method: request.method,
          statusCode: response.statusCode,
          responseTime,
        });
      }),
      catchError((error: { status: number; message: string }) => {
        const endTime = Date.now();
        const responseTime = endTime - statTime;

        this.analyticsService.saveAnalytics({
          controller: context.getClass().name,
          handler: context.getHandler().name,
          method: request.method,
          statusCode: error.status,
          responseTime,
          error: error.message,
        });

        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw error;
      }),
    );
  }
}
