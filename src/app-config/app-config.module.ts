import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports: [AppConfigService],
  //* Centralize all configuration in this module
  //* validations here are spot before runtime
  imports: [
    ConfigModule.forRoot({
      validate: (config: Record<string, any>) => {
        //~ Validation for showing data limit
        if (!config.DEFAULT_LIMIT) {
          config.DEFAULT_LIMIT = 10;
        } else {
          const limit = parseInt(config.DEFAULT_LIMIT);

          if (isNaN(limit) || limit <= 0) {
            throw new Error('Invalid DEFAULT_LIMIT');
          }

          config.DEFAULT_LIMIT = limit;
        }

        //~ Validation for seed data
        if (!config.SEED_DATA_FILE_PATH) {
          config.SEED_DATA_FILE_PATH = 'fixtures/seed-data.json';
        } else if (!config.SEED_DATA_FILE_PATH.endsWith('.json')) {
          throw new Error('Invalid SEED_DATA_FILE_PATH');
        }

        //* Validation here can set the config values before returning it
        //- No longer needed at Service Level
        return config;
      },
    }),
  ],
  providers: [AppConfigService],
})
export class AppConfigModule {}
