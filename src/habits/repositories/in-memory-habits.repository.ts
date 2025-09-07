import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryHabitsRepository {
  private habits: any[] = [];

  findAllHabits() {
    return this.habits;
  }
}
