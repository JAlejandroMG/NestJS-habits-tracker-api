import { Expose, Type } from 'class-transformer';

//~ We need to use a class in order to use class-transformer
export class UserDomain {
  @Expose()
  @Type(() => Date)
  dateOfBirth?: string | Date;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  middleName?: string;

  @Expose()
  password: string;

  @Expose()
  userId: string;

  @Expose()
  userName: string;
}
