import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/app-config/app-config.service';
import { AdminUserDomainModel } from './models/admin-user-domain.model';
import { HashingService } from 'src/hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly appConfigService: AppConfigService,
    //* Added
    private readonly hashingService: HashingService,
  ) {}

  //* Modified
  async getAdminUserByApiKey(
    apiKey: string,
  ): Promise<AdminUserDomainModel | undefined> {
    if (!apiKey) {
      return undefined;
    }

    const superUser = this.appConfigService.superUser;
    const systemUser = this.appConfigService.systemUser;
    const supportUser = this.appConfigService.supportUser;
    //* Added
    const adminUsers = [superUser, systemUser, supportUser];
    //* Added
    let adminUser: AdminUserDomainModel | undefined;

    //* This is comparing a hashed value vs a normal value
    //* in a synchronous way
    /*return [superUser, systemUser, supportUser].find(
      (user) => user.apiKey === apiKey,
    );*/

    // eslint-disable-next-line @typescript-eslint/await-thenable
    for await (const user of adminUsers) {
      if (await this.hashingService.compare(apiKey, user.apiKey)) {
        adminUser = user;
        break;
      }
    }

    return adminUser;
  }
}
