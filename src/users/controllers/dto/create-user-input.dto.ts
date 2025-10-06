export interface CreateUserInputDto {
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
  userName: string;
}
