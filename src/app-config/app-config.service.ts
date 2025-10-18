import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AccessLevelEnum } from 'src/auth/models/acess-level.enum';
import { AdminUserDomainModel } from 'src/auth/models/admin-user-domain.model';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get authorizationApiKey(): string | undefined {
    return this.configService.get<string>('AUTHORIZATION_API_KEY');
  }

  get defaultLimit(): number {
    return this.configService.get<number>('DEFAULT_LIMIT')!;
  }

  get mongoUri(): string {
    return this.configService.get<string>('MONGO_URI')!;
  }

  get ormOptions(): TypeOrmModuleOptions {
    return {
      //* When a new TypeORM entity is declared,
      //* this allows it to be injected automatically.
      //* Otherwise should be listed manually.
      autoLoadEntities: true,
      host: this.configService.get<string>('ORM_HOST'),
      password: this.configService.get<string>('ORM_PASSWORD'),
      port: this.configService.get<number>('ORM_PORT'),
      synchronize: this.configService.get<boolean>('ORM_SYNCHRONIZE'),
      type: this.configService.get<'postgres' | 'mysql'>('ORM_TYPE'),
      username: this.configService.get<string>('ORM_USERNAME'),
    };
  }

  get seedDataFilePath(): string {
    return this.configService.get<string>('SEED_DATA_FILE_PATH')!;
  }

  //* Removed
  /*get superUserApiKey(): string | undefined {
    return this.configService.get<string>('SUPER_USER_API_KEY');
  }*/

  get superUser(): AdminUserDomainModel {
    const apiKey = this.configService.get<string>(
      'SUPER_USER_API_KEY',
    ) as string;
    const email = this.configService.get<string>('SUPER_USER_EMAIL');
    const username = this.configService.get<string>('SUPER_USER_NAME');

    return {
      accessLevel: AccessLevelEnum.SUPER_USER,
      apiKey,
      email,
      username,
    };
  }

  //* Removed
  /*get supportUserApiKey(): string | undefined {
    return this.configService.get<string>('SUPPORT_USER_API_KEY');
  }*/

  get supportUser(): AdminUserDomainModel {
    const apiKey = this.configService.get<string>(
      'SUPPORT_USER_API_KEY',
    ) as string;
    const email = this.configService.get<string>('SUPPORT_USER_EMAIL');
    const username = this.configService.get<string>('SUPPORT_USER_NAME');

    return {
      accessLevel: AccessLevelEnum.SUPPORT_USER,
      apiKey,
      email,
      username,
    };
  }

  //* Removed
  /*get systemUserApiKey(): string | undefined {
    return this.configService.get<string>('SYSTEM_USER_API_KEY');
  }*/

  get systemUser(): AdminUserDomainModel {
    const apiKey = this.configService.get<string>(
      'SYSTEM_USER_API_KEY',
    ) as string;
    const email = this.configService.get<string>('SYSTEM_USER_EMAIL');
    const username = this.configService.get<string>('SYSTEM_USER_NAME');

    return {
      accessLevel: AccessLevelEnum.SYSTEM_USER,
      apiKey,
      email,
      username,
    };
  }
}
