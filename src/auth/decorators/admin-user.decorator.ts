import {
  createParamDecorator /*, SetMetadata, ExecutionContext*/,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
// import { AdminUserDomainModel } from '../models/admin-user-domain.model';
import { RequestWithAdminUser } from 'src/utils/commonTypes/requestWithAdminUser.type';

/*type RequestWithAdminUser = Request & {
  adminUser: AdminUserDomainModel;
};*/

// export const AdminUser = (...args: string[]) => SetMetadata('admin-user', args);
export const AdminUser = createParamDecorator(
  (data, ctx: ExecutionContextHost) => {
    const request = ctx.switchToHttp().getRequest<RequestWithAdminUser>();
    return request.adminUser;
  },
);
