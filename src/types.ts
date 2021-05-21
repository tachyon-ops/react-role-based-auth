import React from 'react';

/**
 * RefreshToken Errors
 */
enum RBAuthErrors {
  INVALID_GRANT = 'invalid_grant',
  REFRESH_TOKEN_REVOKED = 'refreshTokenRevoked',
  REFRESH_TOKEN_NOT_PRESENT = 'noRefreshToken',
  UNAUTHORIZED = 'Unauthorized',
  TOO_MANY_REQUESTS = 'Too Many Requests',
  FAILLED_TO_FETCH = 'failled to fetch',
  UNKNOWN = 'UNKNOWN',
}

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
export type KnownAuthProcess<R> = (...args: any) => Promise<R>;
export type UnknownAuthProcess = <R>(...args: any) => Promise<R | unknown | void>;
export type UnknownRefreshProcess = <R>(reloadFlag?: boolean) => Promise<R | unknown | void>;

// Auth Context type
export type RBAuthContextType<
  TUser extends RBAuthUserModelWithRole<string> = RBAuthUserModelWithRole,
  TRules extends RBAuthRulesInterface<string> = RBAuthRulesInterface<RBAuthBaseRoles>,
  LoginType = UnknownAuthProcess,
  LogOutType = UnknownAuthProcess,
  SignUpType = UnknownAuthProcess,
  SilentAuthType = UnknownAuthProcess,
  HandleAuthType = UnknownAuthProcess,
  RefreshTokens = UnknownRefreshProcess,
  TApis = Record<string, unknown>
> = {
  isAuth: boolean; // to check if authenticated or not
  reloading: boolean;
  user: TUser; // store all the user details
  logic: {
    login: LoginType; // to start the login process
    signup: SignUpType;
    silent: SilentAuthType;
    handle: HandleAuthType; // handle Auth0 login process
    logout: LogOutType; // logout the user
    refresh: RefreshTokens;
    apis: TApis;
  };
  routes: {
    public: string;
    private: string;
  };
  rules?: TRules;
};

/**
 * React Context Type - for your AppAuthContext
 */
export type RBAuthReactContext<
  TUser extends RBAuthUserModelWithRole<string>,
  TRules extends RBAuthRulesInterface<string>,
  LoginType extends UnknownAuthProcess = UnknownAuthProcess,
  LogOutType extends UnknownAuthProcess = UnknownAuthProcess,
  SignUpType extends UnknownAuthProcess = UnknownAuthProcess,
  HandleAuthType extends UnknownAuthProcess = UnknownAuthProcess,
  SilentAuthType extends UnknownAuthProcess = UnknownAuthProcess,
  RefreshTokensType extends UnknownAuthProcess = UnknownAuthProcess,
  // AppApis
  TApi extends Record<string, unknown> = Record<string, unknown>
> = React.Context<
  RBAuthContextType<
    TUser,
    TRules,
    LoginType,
    LogOutType,
    SignUpType,
    SilentAuthType,
    HandleAuthType,
    RefreshTokensType,
    // AppApis
    TApi
  >
>;

/**
 * Types for Auth processing
 */
export type SetterType = (variable: any) => void;

export interface AuthApiInterface {
  login: KnownAuthProcess<{
    tokens: RBAuthTokensType;
    user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
  }>;
  logout: UnknownAuthProcess;
  signup: UnknownAuthProcess;
  handle: KnownAuthProcess<{
    tokens: RBAuthTokensType;
    user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
  }>;
  silent: KnownAuthProcess<{
    tokens: RBAuthTokensType;
    user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
  }>;
}
export type PartialAuthApi = Partial<AuthApiInterface>;

export type RBAuthTokensType = {
  accessToken: string;
  refreshToken: string;
  openIdToken: string;
  expiresIn: string;
  scope: string;
  tokenType: string;
};

/**
 * RBAuthStorageType
 * @implNote
 * If you create any 'get Tokens' functionality, please make it private, either by using ES6 classes or
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#Emulating_private_methods_with_closures
 */
export type RBAuthStorageType = {
  accessToken: string;
  refreshToken: string;
  openIdToken: string;
  tokenType: string;
  expiresIn: string;
  scope: string;
  setTokens: (tokens: RBAuthTokensType) => void;
};

export {
  //
  RBAuthErrors,
};
