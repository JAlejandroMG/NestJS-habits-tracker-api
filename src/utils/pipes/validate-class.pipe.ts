import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidateClassPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (this.isNativeType(metadata.metatype)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dto = plainToInstance(metadata.metatype!, value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const errors = await validate(dto);

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return dto;
  }

  private isNativeType = (metatype: ArgumentMetadata['metatype']) => {
    if (!metatype) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const nativeTypes: Function[] = [String, Number, Boolean, Array, Object];

    return nativeTypes.includes(metatype);
  };
}
