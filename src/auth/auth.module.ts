import { DynamicModule, Module, Type } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { ApiKeyAuthorizationGuard } from './guards/api-key-authorization.guard';
import { AdminAuthorizationGuard } from './guards/admin-authorization.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthService } from './auth.service';
import { HashingModule } from 'src/hashing/hashing.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [AppConfigModule, HashingModule],
  providers: [
    /*{
      provide: APP_GUARD,
      useClass: ApiKeyAuthorizationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AdminAuthorizationGuard,
    },*/
    {
      provide: APP_GUARD,
      useClass: AdminAuthGuard,
    },
    AdminAuthorizationGuard,
    ApiKeyAuthorizationGuard,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {
  static withUsersModule(usersModule: Type | DynamicModule) {
    return {
      imports: [usersModule],
      module: AuthModule,
    };
  }
}
