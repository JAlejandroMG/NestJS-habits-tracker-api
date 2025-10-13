import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { ApiKeyAuthorizationGuard } from './guards/api-key-authorization/api-key-authorization.guard';

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyAuthorizationGuard,
    },
  ],
})
export class AuthModule {}
