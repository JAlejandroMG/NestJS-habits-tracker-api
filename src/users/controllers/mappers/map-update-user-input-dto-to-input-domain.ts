import { UpdatedUserInputDomain } from 'src/users/services/models/update-user-input.domain';
import { UpdateUserInputDto } from '../dto/update-user-input.dto';
import { removeUndefinedValues } from 'src/utils/remove-undefined-values';

export const mapUpdateUserInputDtoToInputDomain = (
  id: string,
  updateUserInputDto: UpdateUserInputDto,
): UpdatedUserInputDomain => {
  //* Added
  const cleanData = removeUndefinedValues<Partial<UpdateUserInputDto>>({
    //* Added
    dateOfBirth: updateUserInputDto.dateOfBirth,
    email: updateUserInputDto.email,
    firstName: updateUserInputDto.firstName,
    lastName: updateUserInputDto.lastName,
    middleName: updateUserInputDto.middleName,
    password: updateUserInputDto.password,
    userName: updateUserInputDto.userName,
  });

  return {
    //* Modified
    // ...updateUserInputDto,
    ...cleanData,
    userId: id,
  };
};
