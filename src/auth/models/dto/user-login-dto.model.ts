import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDtoModel {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
