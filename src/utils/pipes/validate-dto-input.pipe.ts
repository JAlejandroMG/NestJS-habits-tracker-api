import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { DtoInput } from '../dto/dto-input';

@Injectable()
export class ValidateDtoInputPipe implements PipeTransform {
  //~ Leave transform type as any, cause we need the pipe as general as possible
  transform(value: any, metadata: ArgumentMetadata) {
    const isDtoInput = metadata.metatype?.prototype instanceof DtoInput;

    if (isDtoInput) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const dto = new metadata.metatype();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      dto.validate(value);

      //* Because it's been validated, its safe to instance the values.
      //* So a string Date can be instantiated to a JS Date object.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return dto.toInstance(value);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  }
}
