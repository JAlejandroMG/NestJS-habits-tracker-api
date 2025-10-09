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
  //   UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ValidateUlidPipe } from 'src/utils/pipes/validate-ulid.pipe';
import { USERS } from 'src/utils/constants';

import { UsersService } from '../services/users.service';
import { UserDto } from './dto/user.dto';
import {
  CreateUserInputDto,
  /*createUserSchema,*/
} from './dto/create-user-input.dto';
import { UpdateUserInputDto } from './dto/update-user-input.dto';
import { mapUserDomainToUserDto } from './mappers/map-user-domain-to-user-dto';
import { mapCreateUserInputDtoToInputDomain } from './mappers/map-create-user-input-dto-to-input-domain';
import { mapUpdateUserInputDtoToInputDomain } from './mappers/map-update-user-input-dto-to-input-domain';
// import { ValidateZodSchemaPipe } from 'src/utils/pipes/validate-zod-schema.pipe';
// import { ValidateClassPipe } from 'src/utils/pipes/validate-class.pipe';
import { FindAllUsersQueryDto } from './dto/find-all-users-query.dto';

@Controller(USERS)
//*This could be removed when ValidationPipe applied at Application level
/*@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    disableErrorMessages: true,
  }),
)*/
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    // @Body(new ValidateZodSchemaPipe(createUserSchema))
    //* Added
    //~ Built-in NestJS Validation Pipe
    @Body()
    createUserInputDto: CreateUserInputDto,
    //*This could be removed when ValidationPipe applied at Method level
    /*new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: true,
      }),*/
  ): Promise<UserDto> {
    console.log('controller createUserInputDto', createUserInputDto);
    const user = await this.usersService.createUser(
      mapCreateUserInputDtoToInputDomain(createUserInputDto),
    );

    return mapUserDomainToUserDto(user)!;
  }

  //*This could be removed when ValidationPipe applied at Controller level
  /*@UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: true,
    }),
  )*/
  @Get()
  async findAllUsers(
    // @Query('limmit') limit: string,
    // @Query('sortBy') sortBy: 'firstName' | 'lastName' | 'id',
    //* Modified
    @Query()
    query: FindAllUsersQueryDto,
  ): Promise<UserDto[]> {
    //* Removed
    // const limitNumber = limit ? +limit : undefined;
    const users = await this.usersService.findAllUsers({
      //   limit: limitNumber,
      //   sortBy,
      //* Modified
      limit: query.limit,
      sortBy: query.sortBy,
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
    // @Body(ValidateClassPipe) updateUserInput: UpdateUserInputDto,
    //* Added
    //~ Built-in NestJS Validation Pipe
    @Body(ValidationPipe) updateUserInput: UpdateUserInputDto,
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
