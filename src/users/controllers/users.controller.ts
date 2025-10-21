import {
  Body,
  ClassSerializerInterceptor,
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
  SerializeOptions,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { ValidateUlidPipe } from 'src/utils/pipes/validate-ulid.pipe';
import { USERS } from 'src/utils/constants';

import { UsersService } from '../services/users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdateUserInputDto } from './dto/update-user-input.dto';
import { mapUserDomainToUserDto } from './mappers/map-user-domain-to-user-dto';
import { mapCreateUserInputDtoToInputDomain } from './mappers/map-create-user-input-dto-to-input-domain';
import { mapUpdateUserInputDtoToInputDomain } from './mappers/map-update-user-input-dto-to-input-domain';
import { FindAllUsersQueryDto } from './dto/find-all-users-query.dto';
import { RedactResponseInterceptor } from 'src/utils/interceptors/redact-response.interceptor';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { GrantAccess } from 'src/auth/decorators/grant-access.decorator';
import { AccessLevelEnum } from 'src/auth/models/acess-level.enum';
import { AdminUserDomainModel } from 'src/auth/models/domain/admin-user-domain.model';
import { AdminUser } from '../../auth/decorators/admin-user.decorator';

@UseInterceptors(RedactResponseInterceptor, ClassSerializerInterceptor)
@SerializeOptions({
  type: UserDto,
  excludeExtraneousValues: true,
})
@Controller(USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrantAccess(AccessLevelEnum.SYSTEM_USER)
  @Post()
  async createUser(
    @Body()
    createUserInputDto: CreateUserInputDto,
  ): Promise<UserDto> {
    const user = await this.usersService.createUser(
      mapCreateUserInputDtoToInputDomain(createUserInputDto),
    );

    return mapUserDomainToUserDto(user)!;
  }

  @IsPublic(true)
  @Get()
  async findAllUsers(
    @Query()
    query: FindAllUsersQueryDto,
  ): Promise<UserDto[]> {
    const users = await this.usersService.findAllUsers({
      limit: query.limit,
      sortBy: query.sortBy,
    });

    return users.map((user) => mapUserDomainToUserDto(user)!);
  }

  @GrantAccess(AccessLevelEnum.SUPPORT_USER)
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

  @GrantAccess(AccessLevelEnum.SUPER_USER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async removeUser(
    @Param('id', ValidateUlidPipe) id: string,
    @AdminUser() adminUser: AdminUserDomainModel,
  ): Promise<UserDto | undefined> {
    const user = await this.usersService.removeUser(id);
    console.log('adminUser', adminUser);

    if (!user) {
      throw new NotFoundException(`User with id: '${id}' has not been found`);
    }

    return mapUserDomainToUserDto(user);
  }

  @GrantAccess(AccessLevelEnum.SUPER_USER)
  @Patch(':id')
  async updateUser(
    @Param('id', ValidateUlidPipe) id: string,
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
