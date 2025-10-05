import { isValid } from 'ulid';

import {
  //   ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  Optional,
  PipeTransform,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
// export class ValidateUlidIdPipe implements PipeTransform {
//* Return a Promise because async
export class ValidationUlidPipe
  implements PipeTransform<string, Promise<string>>
{
  //~ For an optional custom validation error message
  //~ there should be a constructor.
  constructor(
    @Optional()
    private readonly errorMsg?: string,
    //* Because NestJS is in charge of creating the instance
    //* Additional dependencies can be injected into de Pipe
    @Optional()
    private readonly usersService?: UsersService,
  ) {}

  //   transform(value: any, metadata: ArgumentMetadata) {
  //* Modified as async
  async transform(value: string /*, metadata: ArgumentMetadata*/) {
    if (!isValid(value)) {
      throw new BadRequestException(
        this.errorMsg ?? 'Invalid user id, it must be a valid ulid',
      );
    }

    //* Added dependency
    if (this.usersService) {
      const user = await this.usersService.findOneUser(value);

      console.log('Heeeeeeeeereee!!!');

      if (!user) {
        throw new NotFoundException(`User with id ${value} not found in Pipe`);
      }
    }

    return value;
  }
}
