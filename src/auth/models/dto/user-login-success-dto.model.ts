import { Expose } from 'class-transformer';

export class UserLoginSuccessDtoModel {
  @Expose()
  accessToken: string;
}
