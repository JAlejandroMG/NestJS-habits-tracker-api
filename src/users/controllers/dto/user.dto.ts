import { Expose, Type } from 'class-transformer';

//* Modified
// export interface UserDto {
//~ We need to use a class in order to use class-transformer
export class UserDto {
  @Expose()
  @Type(() => Date)
  dateOfBirth?: string | Date;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  id: string;

  //* This is not exposed, only needed inside the controller
  isActive: boolean;

  @Expose()
  lastName: string;

  @Expose()
  middleName?: string;

  @Expose()
  password: string;

  @Expose()
  userName: string;
}
