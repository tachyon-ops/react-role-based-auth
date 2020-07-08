import { RBAuthUser } from '../../lib';

export interface UserModel extends RBAuthUser {
  name: string;
}

export const anonUser: UserModel = { name: '', role: 'visitor' };
export const regUser: UserModel = { name: 'Role Based Auth', role: 'admin' };
