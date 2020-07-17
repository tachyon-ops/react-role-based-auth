import type React from 'react';

import { AuthCallback } from './components/AuthCallback';
import { RefreshApp } from './components/RefreshApp';
import { SecureScreen } from './components/SecureScreen';
import { Auth } from './components/Auth';
import { AuthApiForContext } from './authServices/BaseAuthApiWrapper';
import { AuthContext } from './roles-based-auth/context';

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
export interface RBAuthUserModelWithRole<T extends string = RBAuthBaseRoles> {
  role: RBAuthGenericRoles<T>;
}

/**
 * Context types
 */
export type UnknownAuthProcess = <R>(
  ...args: any
) => Promise<R | unknown | void>;

export type RBAuthTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

// Auth Context type
export type RBAuthContextType<
  TUser extends RBAuthUserModelWithRole<string> = RBAuthUserModelWithRole,
  TRules extends RBAuthRulesInterface<string> = RBAuthRulesInterface<
    RBAuthBaseRoles
  >,
  LoginType = UnknownAuthProcess,
  LogOutType = UnknownAuthProcess,
  SignUpType = UnknownAuthProcess,
  SilentAuthType = UnknownAuthProcess,
  HandleAuthType = UnknownAuthProcess
> = {
  isAuth: boolean; // to check if authenticated or not
  reloading: boolean;
  user: TUser; // store all the user details
  tokens: RBAuthTokens; // accessToken of user for Auth0
  logic: {
    login: LoginType; // to start the login process
    signup: SignUpType;
    silent: SilentAuthType;
    handle: HandleAuthType; // handle Auth0 login process
    logout: LogOutType; // logout the user
  };
  routes: {
    public: string;
    private: string;
  };
  rules?: TRules;
};

// export type RBAuthReactContext<TUser extends UserModelWithRole<string>> = React.Context<RBAuthContextType<TUser>>;
export type RBAuthReactContext<
  TUser extends RBAuthUserModelWithRole<string>,
  TRules extends RBAuthRulesInterface<string>,
  // AuthApi extends AuthApiInterface
  LoginType extends UnknownAuthProcess = UnknownAuthProcess,
  LogOutType extends UnknownAuthProcess = UnknownAuthProcess,
  SignUpType extends UnknownAuthProcess = UnknownAuthProcess,
  HandleAuthType extends UnknownAuthProcess = UnknownAuthProcess,
  SilentAuthType extends UnknownAuthProcess = UnknownAuthProcess
> = React.Context<
  RBAuthContextType<
    TUser,
    TRules,
    // AuthApi
    LoginType,
    LogOutType,
    SignUpType,
    HandleAuthType,
    SilentAuthType
  >
>;

export type SetterType = (variable: any) => void;

export interface AuthApiInterface {
  login: UnknownAuthProcess;
  logout: UnknownAuthProcess;
  signup: UnknownAuthProcess;
  handle: UnknownAuthProcess;
  silent: UnknownAuthProcess;
}
export type PartialAuthApi = Partial<AuthApiInterface>;

export {
  AuthContext,
  AuthApiForContext,
  Auth,
  RefreshApp,
  SecureScreen,
  AuthCallback,
};
