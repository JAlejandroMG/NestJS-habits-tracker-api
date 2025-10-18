import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/app-config/app-config.service';
import { AdminUserDomainModel } from './models/admin-user-domain.model';

@Injectable()
export class AuthService {
  constructor(private readonly appConfigService: AppConfigService) {}

  getAdminUserByApiKey(apiKey: string): AdminUserDomainModel | undefined {
    if (!apiKey) {
      return undefined;
    }

    const superUser = this.appConfigService.superUser;
    const systemUser = this.appConfigService.systemUser;
    const supportUser = this.appConfigService.supportUser;

    return [superUser, systemUser, supportUser].find(
      (user) => user.apiKey === apiKey,
    );
  }
}
