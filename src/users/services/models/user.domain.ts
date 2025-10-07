export interface UserDomain {
  //* Added
  dateOfBirth?: string | Date;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
  userId: string;
  userName: string;
}
