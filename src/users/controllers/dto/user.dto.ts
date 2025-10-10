import { Expose, Type } from 'class-transformer';

//~ We need to use a class in order to use class-transformer
export class UserDto {
  @Expose()
  @Type(() => Date)
  dateOfBirth?: string | Date;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  //* Optional temporary for serialize-dto interceptor example
  @Expose()
  id?: string;

  //~ This is not exposed, only needed inside the controller
  //   isActive: boolean;

  @Expose()
  lastName: string;

  @Expose()
  middleName?: string;

  @Expose()
  password: string;

  @Expose()
  userName: string;

  //* Temporary
  userId: string;
}
