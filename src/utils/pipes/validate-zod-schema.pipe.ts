import { ZodSchema } from 'zod';

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateZodSchemaPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);

      return parsedValue;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
