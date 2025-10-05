import { isValid } from 'ulid';

import {
  //   ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
// export class ValidateUlidIdPipe implements PipeTransform {
export class ValidationUlidPipe implements PipeTransform<string, string> {
  //~ For an optional custom validation error message
  //~ there should be a constructor.
  constructor(
    @Optional()
    private readonly errorMsg?: string,
  ) {}

  //   transform(value: any, metadata: ArgumentMetadata) {
  transform(value: string /*, metadata: ArgumentMetadata*/) {
    if (!isValid(value)) {
      throw new BadRequestException(
        this.errorMsg ?? 'Invalid user id, it must be a valid ulid',
      );
    }

    return value;
  }
}
