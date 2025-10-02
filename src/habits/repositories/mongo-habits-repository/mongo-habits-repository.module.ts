import { Module } from '@nestjs/common';
import { AbstractHabitsRepository } from 'src/habits/services/habits.repository';
import { MongoConnectionModule } from 'src/mongo-connection/mongo-connection.module';
import { HABITS } from 'src/utils/constants';
import { MongoHabitsRepository } from './mongo-habits.repository';

@Module({
  exports: [AbstractHabitsRepository],
  imports: [
    MongoConnectionModule.forFeature({
      collectionName: HABITS,
    }),
  ],
  providers: [
    {
      provide: AbstractHabitsRepository,
      useClass: MongoHabitsRepository,
    },
  ],
})
export class MongoHabitsRepositoryModule {}
