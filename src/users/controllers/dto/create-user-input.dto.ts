import { User } from 'src/utils/constants';
import { DtoInput } from 'src/utils/dto/dto-input';
import {
  isDate,
  isMinLength,
  isNotEmptyString,
  isRequired,
  isString,
} from 'src/utils/http-input-validation';

//* Modified made it Class
//* To extend abstract DtoInput and implement method
export class CreateUserInputDto extends DtoInput {
  dateOfBirth?: string | Date;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
  userName: string;

  //* Added
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

  //* Added
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
}
