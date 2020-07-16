import type React from 'react';

import { AuthContext } from './roles-based-auth/context';
import { AuthCallback } from './authServices/AuthCallback';
import { RefreshApp } from './authServices/RefreshApp';
import { SecureScreen } from './authServices/SecureScreen';

/**
 * SecureRoute Types
 */
export type RBAuthRedirect = React.FC<{ to: string }>;

/**
 * Roles Types
 */
export type RBAuthBaseRoles = 'admin' | 'public';

/**
 * Rule Types
 */
type RBAuthStaticRulesType = string[];
type RBAuthDynamicRulesType = {
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
 * User types
 */
type RBAuthGenericRoles<T extends string> = 'admin' | 'public' | T;
export interface UserModelWithRole<T extends string = RBAuthBaseRoles> {
  role: RBAuthGenericRoles<T>;
}

/**
 * Context types
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoginFunctionType = (...args: any[]) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SilentAuthFunctionType = (...args: any[]) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandleAuthFunctionType = (...args: any[]) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LogoutAuthFunctionType = (...args: any[]) => void;

// Auth Context type
export type RBAuthContextType<
  TUser extends UserModelWithRole<string> = UserModelWithRole,
  TRules extends RBAuthRulesInterface<string> = RBAuthRulesInterface<RBAuthBaseRoles>
> = {
  authenticated: boolean; // to check if authenticated or not
  reloading: boolean;
  user: TUser; // store all the user details
  accessToken: string; // accessToken of user for Auth0
  login: LoginFunctionType; // to start the login process
  silentAuth: SilentAuthFunctionType;
  handleAuthentication: HandleAuthFunctionType; // handle Auth0 login process
  logout: LogoutAuthFunctionType; // logout the user
  routes: {
    public: string;
    private: string;
  };
  rules?: TRules;
};

// export type RBAuthReactContext<TUser extends UserModelWithRole<string>> = React.Context<RBAuthContextType<TUser>>;
export type RBAuthReactContext<
  TUser extends UserModelWithRole<string>,
  TRules extends RBAuthRulesInterface<string>
> = React.Context<RBAuthContextType<TUser, TRules>>;

export {
  // Roles Based Auth
  AuthContext,
  // AuthServices
  AuthCallback,
  RefreshApp,
  SecureScreen,
};
