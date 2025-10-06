export interface UserEntity {
  createdAt: Date;
  dateOfBirth: Date;
  email: string;
  firstName: string;
  id: number; //* This comes from the DB
  lastName: string;
  middleName?: string;
  password: string;
  updatedAt: Date;
  userId: string;
  userName: string;
}
