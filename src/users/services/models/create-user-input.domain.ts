export interface CreateUserInputDomain {
  dateOfBirth?: string | Date;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
  userName: string;
}
