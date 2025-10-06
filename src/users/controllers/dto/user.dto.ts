export interface UserDto {
  //* Added
  dateOfBirth: Date;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  middleName?: string;
  password: string;
  userName: string;
}
