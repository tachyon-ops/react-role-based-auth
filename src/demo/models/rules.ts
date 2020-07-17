import { RBAuthRulesInterface } from 'react-rb-auth';

import { AppRoles } from './role';

type IndexableUser = { id: string };

export const rules: RBAuthRulesInterface<AppRoles> = {
  public: {
    static: [
      // visitor permissions
      // routes
      'home-page:visit',
      'posts:list',
    ],
  },
  editor: {
    static: [
      // writer permissions
      // routes
      'home-page:visit',
      'dashboard-page:visit',
      // entites
      'users:getSelf',
      'posts:list',
      'posts:create',
    ],
    dynamic: {
      'posts:edit': ({
        userId,
        postOwnerId,
      }: {
        userId: string;
        postOwnerId: string;
      }): boolean => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
    },
  },
  admin: {
    static: [
      // admin permissions
      // routes
      'home-page:visit',
      'dashboard-page:visit',
      // entites
      'users:list',
      'users:create',
      'users:edit',
      'posts:list',
      'posts:create',
      'posts:edit',
      'posts:delete',
    ],
    dynamic: {
      'users:delete': ({
        authUser,
        user,
      }: {
        authUser: IndexableUser;
        user: IndexableUser;
      }): boolean => {
        if (authUser.id === user.id) return false;
        return true;
      },
    },
  },
};
