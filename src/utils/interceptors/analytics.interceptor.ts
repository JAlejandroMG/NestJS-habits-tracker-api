import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { RequestWithAdminUser } from '../commonTypes/requestWithAdminUser.type';

@Injectable()
export class AnalyticsInterceptor implements NestInterceptor {
  constructor(private readonly analyticsService: AnalyticsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<RequestWithAdminUser>();
    const statTime = Date.now();
    const adminUser = request.adminUser;

    return next.handle().pipe(
      tap(() => {
        const response: { statusCode: number } = context
          .switchToHttp()
          .getResponse();
        const endTime = Date.now();
        const responseTime = endTime - statTime;

        this.analyticsService.saveAnalytics({
          adminUserEmail: adminUser?.email,
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
          adminUserEmail: adminUser?.email,
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
