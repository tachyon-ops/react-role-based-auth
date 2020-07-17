import { RBAuthUserModelWithRole } from 'react-rb-auth';

import { AppRoles } from './role';

export interface UserModel extends RBAuthUserModelWithRole<AppRoles> {
  slug: string;
  name: string;
  role: AppRoles;
}

export const anonUser: UserModel = { slug: 'anon', name: '', role: 'public' };
export const regUser: UserModel = {
  slug: 'Admin',
  name: 'Role Based Auth',
  role: 'admin',
};
export const editorUser: UserModel = {
  slug: 'Editor',
  name: 'Role Based Auth',
  role: 'editor',
};
