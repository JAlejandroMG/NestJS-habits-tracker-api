import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class RedactResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const blacklist = [
          'password',
          'passwordHash',
          'salt',
          'secretKey',
          'apiKey',
          'verificationCode',
          'creditCard',
          'securityAnswer',
          'twoFactorSecret',
          'privateKey',
        ];

        const redact = (value: any, blacklist: string[]): any => {
          if (value === null || value === undefined) {
            return value;
          }

          //~ Recursively redact the fields that are arrays
          if (Array.isArray(value)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return value.map((item) => redact(item, blacklist));
          }

          if (value instanceof Date) {
            return value.toISOString();
          }

          if (typeof value === 'object') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const obj = { ...value };

            //~ Remove the fields that are in the blacklist
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            blacklist.forEach((key) => delete obj[key]);

            //~ Remove the fields that start with an underscore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            Object.keys(obj).forEach((key) => {
              if (key.startsWith('_')) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                delete obj[key];
              }
            });

            //~ Recursively redact the fields that are objects
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            Object.keys(obj).forEach((key) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
              obj[key] = redact(obj[key], blacklist);
            });

            return obj;
          }

          return value;
        };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const filtered = redact(data, blacklist);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return filtered;
      }),
    );
  }
}
