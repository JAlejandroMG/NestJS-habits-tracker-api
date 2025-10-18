import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

export default registerAs('adminUsers', () => {
  const configSchema = Joi.object({
    SUPER_USER_API_KEY: Joi.string().optional().default('ABCDEFGHIJ'),
    SUPER_USER_EMAIL: Joi.string().optional(),
    SUPER_USER_NAME: Joi.string().optional(),

    SYSTEM_USER_API_KEY: Joi.string().optional().default('ABCDE12345'),
    SYSTEM_USER_EMAIL: Joi.string().optional(),
    SYSTEM_USER_NAME: Joi.string().optional(),

    SUPPORT_USER_API_KEY: Joi.string().optional().default('abcde12345'),
    SUPPORT_USER_EMAIL: Joi.string().optional(),
    SUPPORT_USER_NAME: Joi.string().optional(),
  });

  const config = configSchema.validate(process.env, { stripUnknown: true });

  if (config.error) {
    throw new Error(
      `Admin users config validation error: ${config.error.message}`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return config.value;
});
