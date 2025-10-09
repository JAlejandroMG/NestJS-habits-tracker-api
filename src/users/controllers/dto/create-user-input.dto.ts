// import z from 'zod';

import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

//* Will go back to use Class for built-in NestJS validation Pipe
/*export const createUserSchema = z.object({
  dateOfBirth: z.coerce.date().optional(),
  email: z.email(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  middleName: z.string().optional(),
  password: z.string().min(8),
  userName: z.string().nonempty(),
});*/

// export type CreateUserInputDto = z.infer<typeof createUserSchema>;

export class CreateUserInputDto {
  @IsDate()
  @IsOptional()
  //~ Factory funnction that returns a constructor
  //~ to transform this property
  @Type(() => Date)
  dateOfBirth?: Date;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  userName: string;
}
