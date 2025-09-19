import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports: [AppConfigService],
  //* Modified to centralize all configuration in this module
  imports: [ConfigModule.forRoot()],
  providers: [AppConfigService],
})
export class AppConfigModule {}
