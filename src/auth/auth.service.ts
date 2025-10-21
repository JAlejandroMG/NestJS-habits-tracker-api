import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfigService } from 'src/app-config/app-config.service';
import { AdminUserDomainModel } from './models/domain/admin-user-domain.model';
import { HashingService } from 'src/hashing/hashing.service';
import { UsersService } from 'src/users/services/users.service';
import { UserLoginDtoModel } from './models/dto/user-login-dto.model';
import { UserLoginSuccessDtoModel } from './models/dto/user-login-success-dto.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly hashingService: HashingService,
    //* Added
    private readonly usersService: UsersService,
  ) {}

  async getAdminUserByApiKey(
    apiKey: string,
  ): Promise<AdminUserDomainModel | undefined> {
    if (!apiKey) {
      return undefined;
    }

    const superUser = this.appConfigService.superUser;
    const systemUser = this.appConfigService.systemUser;
    const supportUser = this.appConfigService.supportUser;
    const adminUsers = [superUser, systemUser, supportUser];
    let adminUser: AdminUserDomainModel | undefined;

    // eslint-disable-next-line @typescript-eslint/await-thenable
    for await (const user of adminUsers) {
      if (await this.hashingService.compare(apiKey, user.apiKey)) {
        adminUser = user;
        break;
      }
    }

    return adminUser;
  }

  //* Added
  async loginUser(
    loginDto: UserLoginDtoModel,
  ): Promise<UserLoginSuccessDtoModel> {
    const authError = new UnauthorizedException('Invaild credentials');
    const user = await this.usersService.findUserByUsername(loginDto.username);

    if (!user) {
      throw authError;
    }

    const isPasswordValid = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw authError;
    }

    //* FIXME: Generae real access token
    return {
      accessToken: 'fake-access-token',
    };
  }
}
