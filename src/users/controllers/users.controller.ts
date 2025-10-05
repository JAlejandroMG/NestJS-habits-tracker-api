//* Added
import { isValid } from 'ulid';
import {
  BadRequestException,
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

import { USERS } from 'src/utils/constants';

import { UsersService } from '../services/users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdateUserInputDto } from './dto/update-user-input.dto';
import { mapUserDomainToUserDto } from './mappers/map-user-domain-to-user-dto';
import { mapCreateUserInputDtoToInputDomain } from './mappers/map-create-user-input-dto-to-input-domain';
import { mapUpdateUserInputDtoToInputDomain } from './mappers/map-update-user-input-dto-to-input-domain';
import { ValidationUlidPipe } from 'src/utils/pipes/validation-ulid.pipe';

@Controller(USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() createUserInputDto: CreateUserInputDto,
  ): Promise<UserDto> {
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
      new ValidationUlidPipe('This is a custom validated error messsage.'),
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
    @Param('id', ValidationUlidPipe) id: string,
  ): Promise<UserDto | undefined> {
    const user = await this.usersService.removeUser(id);

    if (!user) {
      throw new NotFoundException(`User with id: '${id}' has not been found`);
    }

    return mapUserDomainToUserDto(user);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ValidationUlidPipe) id: string,
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
