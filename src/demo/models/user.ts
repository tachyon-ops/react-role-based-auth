import { RBAuthBaseRoles, UserModelWithRole } from 'react-rb-auth';

// type AppRoles = RBAuthBaseRoles | 'editor';
type AppRoles = RBAuthBaseRoles | 'editor';

export interface UserModel extends UserModelWithRole<AppRoles> {
  slug: string;
  name: string;
  role: AppRoles;
}

export const anonUser: UserModel = { slug: 'anon', name: '', role: 'public' };
export const regUser: UserModel = { slug: 'Admin', name: 'Role Based Auth', role: 'admin' };
export const editorUser: UserModel = { slug: 'Editor', name: 'Role Based Auth', role: 'editor' };
