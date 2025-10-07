import z from 'zod';

/*import { User } from 'src/utils/constants';
import { DtoInput } from 'src/utils/dto/dto-input';
import {
  isDate,
  isMinLength,
  isNotEmptyString,
  isRequired,
  isString,
} from 'src/utils/http-input-validation';*/

//* This replaces the class CreateUserInputDto
export const createUserSchema = z.object({
  dateOfBirth: z.coerce.date().optional(),
  email: z.email(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  middleName: z.string().optional(),
  password: z.string().min(8),
  userName: z.string().nonempty(),
});

export type CreateUserInputDto = z.infer<typeof createUserSchema>;

//~ Made it Class
//~ to extend abstract DtoInput and implement method
/*export class CreateUserInputDto extends DtoInput {
  dateOfBirth?: string | Date;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
  userName: string;

  validate(createUserInput: CreateUserInputDto): void {
    if (createUserInput.dateOfBirth) {
      isDate(createUserInput.dateOfBirth, User.DATE_OF_BIRTH);
    }

    isRequired(createUserInput.email, User.EMAIL);
    isString(createUserInput.email, User.EMAIL);
    isNotEmptyString(createUserInput.email, User.EMAIL);

    isRequired(createUserInput.firstName, User.FIRST_NAME);
    isString(createUserInput.firstName, User.FIRST_NAME);
    isNotEmptyString(createUserInput.firstName, User.FIRST_NAME);

    isRequired(createUserInput.lastName, User.LAST_NAME);
    isString(createUserInput.lastName, User.LAST_NAME);
    isNotEmptyString(createUserInput.lastName, User.LAST_NAME);

    if (createUserInput.middleName) {
      isString(createUserInput.middleName, User.MIDDLE_NAME);
    }

    isRequired(createUserInput.password, User.PASSWORD);
    isString(createUserInput.password, User.PASSWORD);
    isNotEmptyString(createUserInput.password, User.PASSWORD);
    isMinLength(createUserInput.password, User.PASSWORD, 8);

    isRequired(createUserInput.userName, User.USER_NAME);
    isString(createUserInput.userName, User.USER_NAME);
    isNotEmptyString(createUserInput.userName, User.USER_NAME);
  }

  toInstance(value: CreateUserInputDto): CreateUserInputDto {
    const dto = new CreateUserInputDto();

    dto.dateOfBirth = value.dateOfBirth
      ? new Date(value.dateOfBirth)
      : undefined;
    dto.email = value.email;
    dto.firstName = value.firstName;
    dto.lastName = value.lastName;
    dto.middleName = value.middleName ?? '';
    dto.password = value.password;
    dto.userName = value.userName;

    return dto;
  }
}*/
