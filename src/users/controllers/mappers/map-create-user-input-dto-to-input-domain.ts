import { CreateUserInputDomain } from 'src/users/services/models/create-user-input.domain';
import { CreateUserInputDto } from '../dto/create-user-input.dto';

export const mapCreateUserInputDtoToInputDomain = (
  createUserInputDto: CreateUserInputDto,
): CreateUserInputDomain => {
  return {
    //* Modified
    // ...createUserInputDto,
    //* Added
    dateOfBirth: createUserInputDto.dateOfBirth,
    email: createUserInputDto.email,
    firstName: createUserInputDto.firstName,
    lastName: createUserInputDto.lastName,
    middleName: createUserInputDto.middleName,
    password: createUserInputDto.password,
    userName: createUserInputDto.userName,
  };
};
