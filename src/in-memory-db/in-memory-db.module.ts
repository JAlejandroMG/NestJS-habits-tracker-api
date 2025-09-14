import { Module } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { SeedDataProvider } from './models/providers/seed-data.provider';

@Module({
  exports: [InMemoryDbService],
  //* Modified
  providers: [InMemoryDbService, SeedDataProvider],
})
export class InMemoryDbModule {}
