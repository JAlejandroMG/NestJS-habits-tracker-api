export interface UserDto {
  //* Added
  dateOfBirth?: string | Date;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  middleName?: string;
  password: string;
  userName: string;
}
