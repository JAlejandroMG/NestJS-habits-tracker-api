/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DynamicModule, Module, Type } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { ApiKeyAuthorizationGuard } from './guards/api-key-authorization.guard';
import { AdminAuthorizationGuard } from './guards/admin-authorization.guard';
// import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthService } from './auth.service';
import { HashingModule } from 'src/hashing/hashing.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import jwtOptionsConfig from './config/jwt-options.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { UserAuthGuard } from './guards/user-auth.guard';

@Module({
  imports: [
    AppConfigModule,
    HashingModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtOptionsConfig)],
      useFactory: (jwtOptions: ConfigType<typeof jwtOptionsConfig>) => {
        return {
          secret: jwtOptions.JWT_SECRET,
          signOptions: {
            expiresIn: jwtOptions.JWT_EXPIRES_IN,
          },
        };
      },
      inject: [jwtOptionsConfig.KEY],
    }),
  ],
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
      //   useClass: AdminAuthGuard,
      //* Modified to try out UserAuthGuard
      useClass: UserAuthGuard,
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
