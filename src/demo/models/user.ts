import { InitialUserType, BaseRoles } from '../../lib';

export interface UserModel extends InitialUserType<BaseRoles> {
  name: string;
  role: 'admin' | 'visitor';
}
