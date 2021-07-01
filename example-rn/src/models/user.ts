import { RBAuthBaseRoles, RBAuthUserModelWithRole } from 'react-rb-auth';

// type AppRoles = RBAuthBaseRoles | 'editor';
type AppRole = RBAuthBaseRoles | 'editor';

export interface UserModel extends RBAuthUserModelWithRole<AppRole> {
  nickname: string;
  name: string;
  role: AppRole;
  picture: string;
  sub: string;
  updated_at: Date;
}

export const anonUser: UserModel = {
  nickname: 'anon',
  name: '',
  role: 'public',
  picture:
    'https://s.gravatar.com/avatar/af17b538f2e14a4a5c4a23799233af63?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fnu.png',
  sub: '',
  updated_at: new Date(),
};
