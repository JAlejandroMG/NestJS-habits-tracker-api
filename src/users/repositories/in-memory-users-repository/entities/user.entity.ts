export interface UserEntity {
  createdAt: Date;
  firstName: string;
  id: number; //* This comes from the DB
  lastName: string;
  middleName?: string;
  updatedAt: Date;
  userId: string;
}
