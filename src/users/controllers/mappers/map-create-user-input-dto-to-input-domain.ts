import { CreateUserInputDomain } from 'src/users/services/models/create-user-input.domain';
import { CreateUserInputDto } from '../dto/create-user-input.dto';

export const mapCreateUserInputDtoToInputDomain = (
  createUserInputDto: CreateUserInputDto,
): CreateUserInputDomain => {
  return {
    ...createUserInputDto,
  };
};
