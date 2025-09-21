export class HabitEntity {
  createdAt: Date;
  description?: string;
  habitId: string;
  id: number; //* This comes from the DB
  name: string;
  updatedAt: Date;
}
