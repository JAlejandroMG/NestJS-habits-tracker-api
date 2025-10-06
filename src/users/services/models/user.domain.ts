export interface UserDomain {
  //* Added
  dateOfBirth: Date;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
  userId: string;
  userName: string;
}
