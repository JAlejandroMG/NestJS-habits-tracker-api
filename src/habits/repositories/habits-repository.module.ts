import { Module } from '@nestjs/common';

import { InMemoryHabitsRepositoryModule } from './in-memory-habits-repository/in-memory-habits-repository.module';

@Module({
  exports: [InMemoryHabitsRepositoryModule],
  imports: [InMemoryHabitsRepositoryModule],
})
export class HabitsRepositoryModule {}
