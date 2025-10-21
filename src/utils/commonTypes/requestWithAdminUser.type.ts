import { Request } from 'express';
import { AdminUserDomainModel } from 'src/auth/models/domain/admin-user-domain.model';

export type RequestWithAdminUser = Request & {
  adminUser: AdminUserDomainModel;
};
