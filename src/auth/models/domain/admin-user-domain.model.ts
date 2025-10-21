import { AccessLevelEnum } from '../acess-level.enum';

export class AdminUserDomainModel {
  accessLevel: AccessLevelEnum;
  apiKey: string;
  email?: string;
  username?: string;
}
