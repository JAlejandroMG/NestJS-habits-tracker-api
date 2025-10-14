import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { ApiKeyAuthorizationGuard } from './guards/api-key-authorization.guard';
import { AdminAuthorizationGuard } from './guards/admin-authorization.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';

@Module({
  imports: [AppConfigModule],
  providers: [
    //*Removed
    /*{
      provide: APP_GUARD,
      useClass: ApiKeyAuthorizationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AdminAuthorizationGuard,
    },*/
    //*Added
    {
      provide: APP_GUARD,
      useClass: AdminAuthGuard,
    },
    AdminAuthorizationGuard,
    ApiKeyAuthorizationGuard,
  ],
})
export class AuthModule {}
