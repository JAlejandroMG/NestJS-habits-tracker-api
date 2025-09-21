import * as Joi from 'joi';
// import z from 'zod';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './app-config.service';

@Module({
  exports: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DEFAULT_LIMIT: Joi.number().optional().integer().positive().default(10),
        SEED_DATA_FILE_PATH: Joi.string()
          .optional()
          .default('fixtures/seed-data.json')
          .regex(/\.json$/),
      }),
    }),
  ],

  providers: [AppConfigService],
})
export class AppConfigModule {}
