import { ObjectId } from 'mongodb';

export class HabitEntity {
  createdAt: Date;
  description?: string;
  habitId: string;
  _id: ObjectId; //* This comes from the DB
  name: string;
  updatedAt: Date;
}
