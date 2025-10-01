import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
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
        case DbType.TYPE_ORM:
          return TypeOrmModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            /*useFactory: (appConfigService: AppConfigService) => {
              return {
                ...appConfigService.ormOptions,
                //~ This would be needed without autoLoadEntities
                //~ in app-config.service.ts
                entities: [TOrmHabitEntity],
              };
            },*/
            useFactory: (appConfigService: AppConfigService) =>
              appConfigService.ormOptions,
          });
        default:
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          throw new Error(`Unsopported db type: ${dbType}`);
      }
    });

    return {
      imports: coreModules,
      module: CoreModule,
    };
  }
}
