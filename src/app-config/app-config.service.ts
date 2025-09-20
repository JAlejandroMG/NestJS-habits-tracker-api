import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  //* Validation first approach directly here
  //* validations here are spot at runtime

  get defaultLimit(): number {
    //- All this is no longer needed if
    //- validation is made at Module Level
    /* const limit: number = parseInt(
      this.configService.get('DEFAULT_LIMIT', '10'),
    );

    //* Added
    if (isNaN(limit) || limit <= 0) {
      throw new Error('Invalid DEFAULT_LIMIT');
    }

    return limit; */

    return this.configService.get<number>('DEFAULT_LIMIT')!;
  }

  get seedDataFilePath(): string {
    //- All this is no longer needed if
    //- validation is made at Module Level
    /*const filePath: string = this.configService.get(
      'SEED_DATA_FILE_PATH',
      'fixtures/seed-data.json',
    );

    //* Added
    if (!filePath || !filePath.endsWith('.json')) {
      throw new Error('Invalid SEED_DATA_FILE_PATH');
    }

    return filePath; */

    return this.configService.get<string>('SEED_DATA_FILE_PATH')!;
  }
}
