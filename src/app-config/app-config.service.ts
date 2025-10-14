import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get authenticationSuperUserApiKey(): string | undefined {
    return this.configService.get<string>('AUTHENTICATE_SUPER_USER_API_KEY');
  }

  get authenticationSupportUserApiKey(): string | undefined {
    return this.configService.get<string>('AUTHENTICATE_SUPPORT_USER_API_KEY');
  }

  get authenticationSystemUserApiKey(): string | undefined {
    return this.configService.get<string>('AUTHENTICATE_SYSTEM_USER_API_KEY');
  }

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
}
