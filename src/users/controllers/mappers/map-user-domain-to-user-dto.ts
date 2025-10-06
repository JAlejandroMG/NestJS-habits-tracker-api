import { UserDomain } from 'src/users/services/models/user.domain';
import { UserDto } from '../dto/user.dto';

export const mapUserDomainToUserDto = (
  userDomain: UserDomain,
): UserDto | undefined => {
  if (!userDomain) {
    return undefined;
  }

  return {
    dateOfBirth: userDomain.dateOfBirth,
    email: userDomain.email,
    firstName: userDomain.firstName,
    id: userDomain.userId,
    lastName: userDomain.lastName,
    middleName: userDomain.middleName,
    password: userDomain.password,
    userName: userDomain.userName,
  };
};
