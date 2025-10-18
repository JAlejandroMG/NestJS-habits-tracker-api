import { Request } from 'express';
import { AdminUserDomainModel } from 'src/auth/models/admin-user-domain.model';

export type RequestWithAdminUser = Request & {
  adminUser: AdminUserDomainModel;
};
