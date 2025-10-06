export interface UserEntity {
  createdAt: Date;
  //* Added
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
