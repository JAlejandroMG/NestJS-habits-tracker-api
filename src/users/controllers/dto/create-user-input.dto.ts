export interface CreateUserInputDto {
  //* Added
  dateOfBirth: Date;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
  userName: string;
}
