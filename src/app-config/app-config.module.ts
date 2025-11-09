import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './app-config.service';
import adminUsersConfig from 'src/auth/config/admin-users.config';

@Module({
  exports: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      load: [adminUsersConfig],
      validationSchema: Joi.object({
        //~ Authorization API Key
        AUTHORIZATION_API_KEY: Joi.string().optional().default('1234567890'),
        //~
        DEFAULT_LIMIT: Joi.number().optional().integer().positive().default(10),
        MONGO_URI: Joi.string() /*.required(),*/
          .optional()
          .default('mongodb://localhost:27017/habit-tracker'),
        SEED_DATA_FILE_PATH: Joi.string()
          .optional()
          .default('fixtures/seed-data.json')
          .regex(/\.json$/),
        //~ TypeORM
        ORM_HOST: Joi.string(),
        ORM_PASSWORD: Joi.string(),
        ORM_PORT: Joi.number().positive().default(5432),
        //~ True will automatically update the schema with code changes
        //~ This better be done through migrations
        ORM_SYNCHRONIZE: Joi.boolean().default(false),
        ORM_TYPE: Joi.string().valid('postgres', 'mysql').default('postgres'),
        ORM_USERNAME: Joi.string(),
        //~ Middleware
        MAX_BODY_SIZE: Joi.number()
          .optional()
          .default(1024 * 1024),
      }),
    }),
  ],

  providers: [AppConfigService],
})
export class AppConfigModule {}
