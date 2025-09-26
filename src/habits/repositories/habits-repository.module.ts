import { Module } from '@nestjs/common';

import { InMemoryHabitsRepositoryModule } from './in-memory-habits-repository/in-memory-habits-repository.module';
import { MongoHabitsRepositoryModule } from './mongo-habits-repository/mongo-habits-repository.module';

@Module({
  exports: [InMemoryHabitsRepositoryModule],
  imports: [InMemoryHabitsRepositoryModule, MongoHabitsRepositoryModule],
})
export class HabitsRepositoryModule {}
