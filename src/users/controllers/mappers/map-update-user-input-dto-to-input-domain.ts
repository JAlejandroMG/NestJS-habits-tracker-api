import { UpdatedUserInputDomain } from 'src/users/services/models/update-user-input.domain';
import { UpdateUserInputDto } from '../dto/update-user-input.dto';

export const mapUpdateUserInputDtoToInputDomain = (
  id: string,
  updateUserInputDto: UpdateUserInputDto,
): UpdatedUserInputDomain => {
  return {
    ...updateUserInputDto,
    userId: id,
  };
};
