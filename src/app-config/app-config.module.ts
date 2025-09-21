import * as Joi from 'joi';
// import z from 'zod';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './app-config.service';

@Module({
  exports: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      //   validate: (config: Record<string, any>) => {
      /*if (!config.DEFAULT_LIMIT) {
          config.DEFAULT_LIMIT = 10;
        } else {
          const limit = parseInt(config.DEFAULT_LIMIT);

          if (isNaN(limit) || limit <= 0) {
            throw new Error('Invalid DEFAULT_LIMIT');
          }

          config.DEFAULT_LIMIT = limit;
        }*/

      //*Added Zod implementation
      /*const ConfigSchema = z.object({
          DEFAULT_LIMIT: z.coerce
            .number()
            .int()
            .positive()
            .optional()
            .default(10),
          SEED_DATA_FILE_PATH: z
            .string()
            .endsWith('.json')
            .optional()
            .default('fixtures/seed-data.json'),
        });*/

      //* Add Joi imolementation
      validationSchema: Joi.object({
        DEFAULT_LIMIT: Joi.number().optional().integer().positive().default(10),
        SEED_DATA_FILE_PATH: Joi.string()
          .optional()
          .default('fixtures/seed-data.json')
          .regex(/\.json$/),
      }),

      /*if (!config.SEED_DATA_FILE_PATH) {
          config.SEED_DATA_FILE_PATH = 'fixtures/seed-data.json';
        } else if (!config.SEED_DATA_FILE_PATH.endsWith('.json')) {
          throw new Error('Invalid SEED_DATA_FILE_PATH');
        }*/

      // return config;
      //* Add Zod implementation
      // return ConfigSchema.parse(config);
      //   },
    }),
  ],

  providers: [AppConfigService],
})
export class AppConfigModule {}
