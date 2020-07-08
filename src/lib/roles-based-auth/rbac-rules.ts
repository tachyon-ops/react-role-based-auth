/**
 * Types
 */
export type BaseRoles = 'admin' | 'visitor';
export type StaticRulesType = string[];
export type DynamicRulesType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any) => boolean;
};
export type RulesInterface<RoleType extends string> = {
  [key in RoleType]: {
    static?: StaticRulesType;
    dynamic?: DynamicRulesType;
  };
};

/**
 * Example:
 */
export const rules: RulesInterface<'admin' | 'visitor' | 'writer'> = {
  visitor: {
    static: [
      // visitor permissions
      // 'posts:list',
      'home-page:visit',
    ],
  },
  writer: {
    static: [
      // writer permissions
      // 'posts:list',
      // 'posts:create',
      'users:getSelf',
      'home-page:visit',
      'dashboard-page:visit',
    ],
    dynamic: {
      // 'posts:edit': ({ userId, postOwnerId }: { userId: string; postOwnerId: string }) => {
      //     if (!userId || !postOwnerId) return false;
      //     return userId === postOwnerId;
      // },
    },
  },
  admin: {
    static: [
      // admin permissions
      // 'posts:list',
      // 'posts:create',
      // 'posts:edit',
      // 'posts:delete',
      'users:get',
      'users:getSelf',
      'home-page:visit',
      'dashboard-page:visit',
    ],
  },
};
