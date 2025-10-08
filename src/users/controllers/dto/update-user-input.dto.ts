import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserInputDto {
  @IsDate()
  @IsOptional()
  //~ Factory funnction that returns a constructor
  //~ to transform this property
  @Type(() => Date)
  dateOfBirth?: Date;
  //   dateOfBirth?: string | Date;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userName?: string;
}
