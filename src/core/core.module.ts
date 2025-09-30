import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';
import { MongoConnectionModule } from 'src/mongo-connection/mongo-connection.module';
import { DbType } from 'src/utils/constants';

@Module({})
export class CoreModule {
  static forRoot(options: { dbTypes: DbType[] }): DynamicModule {
    const coreModules = options.dbTypes.map((dbType) => {
      switch (dbType) {
        case DbType.IN_MEMORY:
          return InMemoryDbModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: (config: AppConfigService) => {
              return config.seedDataFilePath;
            },
          });
        case DbType.MONGO:
          return MongoConnectionModule.forRoot();
        //* Added
        case DbType.MONGOOSE:
          return MongooseModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: (appConfigService: AppConfigService) => {
              return {
                uri: appConfigService.mongoUri,
              };
            },
          });
        default:
          throw new Error(`Unsopported db type: ${dbType}`);
      }
    });

    return {
      imports: coreModules,
      module: CoreModule,
    };
  }
}
