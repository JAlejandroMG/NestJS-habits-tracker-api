import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { HabitsController } from './controllers/habits.controller';
import { HabitsService } from './services/habits.service';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { HabitsRepositoryModule } from './repositories/habits-repository.module';
import { DbType, HABITS } from 'src/utils/constants';
import { catchMaliciousInput } from 'src/utils/middleware/catch-malicious-input.middleware';

@Module({
  controllers: [HabitsController],
  imports: [AppConfigModule],
  providers: [HabitsService],
})
export class HabitsModule implements NestModule {
  //* Added
  configure(consumer: MiddlewareConsumer) {
    //~ Indicates the middleware is for endpoints startind with HABITS
    // consumer.apply(catchMaliciousInput).forRoutes(HABITS);
    //~ Indicates the middleware only applies for the root defined
    //~ inside the HabitsController
    consumer
      .apply(catchMaliciousInput)
      //~ For GET request in the habits endpoint, middleware will be ignored
      .exclude({ path: HABITS, method: RequestMethod.GET })
      .forRoutes(HabitsController);
  }

  static register(options: { dbType: DbType }): DynamicModule {
    return {
      imports: [HabitsRepositoryModule.register({ dbType: options.dbType })],
      module: HabitsModule,
    };
  }
}
