import { RBAuthBaseRoles, RBAuthUserModelWithRole } from 'react-rb-auth';

// type AppRoles = RBAuthBaseRoles | 'editor';
type AppRole = RBAuthBaseRoles | 'editor';

export interface UserModel extends RBAuthUserModelWithRole<AppRole> {
  slug: string;
  name: string;
  role: AppRole;
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
