import { UserDomain } from 'src/users/services/models/user.domain';
import { UserDto } from '../dto/user.dto';
import { plainToInstance } from 'class-transformer';

export const mapUserDomainToUserDto = (
  userDomain: UserDomain,
): UserDto | undefined => {
  if (!userDomain) {
    return undefined;
  }

  //* Modified
  return plainToInstance(
    UserDto,
    {
      dateOfBirth: userDomain.dateOfBirth,
      email: userDomain.email,
      firstName: userDomain.firstName,
      id: userDomain.userId,
      lastName: userDomain.lastName,
      middleName: userDomain.middleName,
      password: userDomain.password,
      userName: userDomain.userName,
    },
    { excludeExtraneousValues: true },
  );

  /*return plainToInstance(
    UserDto,
    { ...userDomain, id: userDomain.userId },
    { excludeExtraneousValues: true },
  );*/
};
