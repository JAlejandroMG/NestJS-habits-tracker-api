import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigService } from 'src/app-config/app-config.service';
import { HashingService } from 'src/hashing/hashing.service';
import { AbstractUsersRepository as UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { CreateUserInputDto } from '../controllers/dto/create-user-input.dto';
import { UserDomain } from './models/user.domain';
import { ValidationError } from 'src/utils/exceptions/validation-error';
// import { ValidationError } from 'class-validator';

describe('UsersService', () => {
  const appConfigService = createMock<AppConfigService>({
    get defaultLimit() {
      return 10;
    },
  });
  //~ A different implementation when applying useMock
  //   const haschingService = createMock<HashingService>();
  let haschingService: DeepMocked<HashingService>;
  //   const usersRepository = createMock<UsersRepository>();
  let usersRepository: DeepMocked<UsersRepository>;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        //~ When applying useMocker, keep this
        //~ because we're overwriting a property
        {
          provide: AppConfigService,
          useValue: appConfigService,
        },
        //~ Don't need these when using useMocker
        /*{
          provide: HashingService,
          useValue: haschingService,
        },
        {
          provide: UsersRepository,
          useValue: usersRepository,
        },*/
      ],
    })
      .useMocker(createMock)
      .compile();

    userService = module.get<UsersService>(UsersService);
    //~ When applying useMocker we add these
    haschingService = module.get(HashingService);
    usersRepository = module.get(UsersRepository);
  });

  describe('create', () => {
    it('should return a new user when the input is valid', async () => {
      //~ Arrange
      const createUserDto: CreateUserInputDto = {
        email: 'tetuser@example.com',
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'Str@ngP@ssw0rd!12345',
        userName: 'testuser',
      };

      const createdUser: UserDomain = {
        email: 'tetuser@example.com',
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'hashed-password',
        userName: 'testuser',
        userId: '1',
      };

      haschingService.hash.mockResolvedValue('hashed-password');
      usersRepository.createUser.mockResolvedValue(createdUser);

      //~ Act
      const result = await userService.createUser(createUserDto);

      //~ Assert
      expect(result).toEqual(createdUser);
    });

    it('should throw a validation error when the password is weak', async () => {
      //~ Arrange
      const createUserDto: CreateUserInputDto = {
        email: 'tetuser@example.com',
        firstName: 'firstName',
        lastName: 'lastName',
        password: '1234567890',
        userName: 'testuser',
      };

      const createdUser: UserDomain = {
        email: 'tetuser@example.com',
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'hashed-password',
        userName: 'testuser',
        userId: '1',
      };

      haschingService.hash.mockResolvedValue('hashed-password');
      usersRepository.createUser.mockResolvedValue(createdUser);

      //~ Act & Assert
      //+ This only checks the Error Type
      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        ValidationError,
      );
      //+ This checks for the Error message
      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        'Password too weak!',
      );
    });
  });
});
