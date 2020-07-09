import { RBAuthUserModel } from '../../lib';

export interface UserModel extends RBAuthUserModel {
  name: string;
}

export const anonUser: UserModel = { name: '', role: 'visitor' };
export const regUser: UserModel = { name: 'Role Based Auth', role: 'admin' };
