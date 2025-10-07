import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ValidateUlidPipe } from 'src/utils/pipes/validate-ulid.pipe';
import { ValidateDtoInputPipe } from 'src/utils/pipes/validate-dto-input.pipe';
import { /*User,*/ USERS } from 'src/utils/constants';

import { UsersService } from '../services/users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdateUserInputDto } from './dto/update-user-input.dto';
import { mapUserDomainToUserDto } from './mappers/map-user-domain-to-user-dto';
import { mapCreateUserInputDtoToInputDomain } from './mappers/map-create-user-input-dto-to-input-domain';
import { mapUpdateUserInputDtoToInputDomain } from './mappers/map-update-user-input-dto-to-input-domain';
/*import {
  isMinLength,
  isNotEmptyString,
  isRequired,
  isString,
} from 'src/utils/http-input-validation';*/

@Controller(USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //* Move this to CreateUserInputDto
  //* This could also be used for updateUser
  /*private validateCreateUserInput(createUserInput: CreateUserInputDto) {
    isRequired(createUserInput.email, User.EMAIL);
    isString(createUserInput.email, User.EMAIL);
    isNotEmptyString(createUserInput.email, User.EMAIL);

    isString(createUserInput.firstName, User.FIRST_NAME);

    isString(createUserInput.lastName, User.LAST_NAME);

    if (createUserInput.middleName) {
      isString(createUserInput.middleName, User.MIDDLE_NAME);
    }

    isRequired(createUserInput.password, User.PASSWORD);
    isString(createUserInput.password, User.PASSWORD);
    isNotEmptyString(createUserInput.password, User.PASSWORD);
    isMinLength(createUserInput.password, User.PASSWORD, 8);

    isString(createUserInput.userName, User.USER_NAME);
  }*/

  @Post()
  async createUser(
    // @Body() createUserInputDto: CreateUserInputDto,
    //* Modified
    @Body(ValidateDtoInputPipe) createUserInputDto: CreateUserInputDto,
  ): Promise<UserDto> {
    console.log('controller create input dto', createUserInputDto);
    //* Method validateCreateUserInput has been removed
    // this.validateCreateUserInput(createUserInputDto);
    const user = await this.usersService.createUser(
      mapCreateUserInputDtoToInputDomain(createUserInputDto),
    );

    return mapUserDomainToUserDto(user)!;
  }

  @Get()
  async findAllUsers(
    @Query('limmit') limit: string,
    @Query('sortBy') sortBy: 'firstName' | 'lastName' | 'id',
  ): Promise<UserDto[]> {
    const limitNumber = limit ? +limit : undefined;
    const users = await this.usersService.findAllUsers({
      limit: limitNumber,
      sortBy,
    });

    return users.map((user) => mapUserDomainToUserDto(user)!);
  }

  @Get(':id')
  async findOneUser(
    //~ This Pipe will return the value processed.
    //~ (Validated and/or Transformed)
    @Param(
      'id',
      new ValidateUlidPipe('This is a custom validated error messsage.'),
    )
    id: string,
  ): Promise<UserDto | undefined> {
    const user = await this.usersService.findOneUser(id);

    if (!user) {
      throw new NotFoundException(`User with id: '${id}' has not been found`);
    }

    return mapUserDomainToUserDto(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async removeUser(
    @Param('id', ValidateUlidPipe) id: string,
  ): Promise<UserDto | undefined> {
    const user = await this.usersService.removeUser(id);

    if (!user) {
      throw new NotFoundException(`User with id: '${id}' has not been found`);
    }

    return mapUserDomainToUserDto(user);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ValidateUlidPipe) id: string,
    @Body() updateUserInput: UpdateUserInputDto,
  ): Promise<UserDto | undefined> {
    const user = await this.usersService.updateUser(
      mapUpdateUserInputDtoToInputDomain(id, updateUserInput),
    );

    if (!user) {
      throw new NotFoundException(`User with id: '${id}' has not been found`);
    }

    return mapUserDomainToUserDto(user);
  }
}
