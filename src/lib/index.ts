import React from 'react';
import { AuthContext } from './roles-based-auth/context';
import { AuthCallback } from './authServices/AuthCallback';
import { BrowserRefresh } from './authServices/BrowserRefresh';
import { SecuredRoute } from './authServices/SecureRoute';

/**
 * Roles and Rules Types
 */
export type RBAuthBaseRoles = 'admin' | 'visitor';
export type RBAuthStaticRulesType = string[];
export type RBAuthDynamicRulesType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any) => boolean;
};
export type RBAuthRulesInterface<RoleType extends string> = {
  [key in RoleType]: {
    static?: RBAuthStaticRulesType;
    dynamic?: RBAuthDynamicRulesType;
  };
};

/**
 * Context types
 */
export interface RBAuthUser {
  role: RBAuthBaseRoles;
}

// Auth Context type
export type RBAuthContextType<TUser extends RBAuthUser> = {
  authenticated: boolean; // to check if authenticated or not
  reloading: boolean;
  user: TUser; // store all the user details
  accessToken: string; // accessToken of user for Auth0
  login: () => void; // to start the login process
  silentAuth: () => void;
  handleAuthentication: () => void; // handle Auth0 login process
  logout: () => void; // logout the user
  routes: {
    public: string;
    private: string;
  };
};

export type RBAuthReactContext = React.Context<RBAuthContextType<RBAuthUser>>;

export {
  // Roles Based Auth
  AuthContext,
  // AuthServices
  AuthCallback,
  BrowserRefresh,
  SecuredRoute,
};
