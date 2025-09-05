import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';

@Module({
  imports: [HabitsModule], //* Added in 01-NewModule branch/commit with habits folder
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
