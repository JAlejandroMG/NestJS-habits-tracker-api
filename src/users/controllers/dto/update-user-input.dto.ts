export interface UpdateUserInputDto {
  //* Added
  dateOfBirth?: string | Date;
  email?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  password?: string;
  userName?: string;
}
