import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      validate: (config: Record<string, any>) => {
        if (!config.DEFAULT_LIMIT) {
          config.DEFAULT_LIMIT = 10;
        } else {
          const limit = parseInt(config.DEFAULT_LIMIT);

          if (isNaN(limit) || limit <= 0) {
            throw new Error('Invalid DEFAULT_LIMIT');
          }

          config.DEFAULT_LIMIT = limit;
        }

        if (!config.SEED_DATA_FILE_PATH) {
          config.SEED_DATA_FILE_PATH = 'fixtures/seed-data.json';
        } else if (!config.SEED_DATA_FILE_PATH.endsWith('.json')) {
          throw new Error('Invalid SEED_DATA_FILE_PATH');
        }

        return config;
      },
    }),
  ],
  providers: [AppConfigService],
})
export class AppConfigModule {}
