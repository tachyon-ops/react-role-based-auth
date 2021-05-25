// components
import { Auth } from './components/Auth'
import { AuthCallback } from './components/AuthCallback'
import { RefreshApp } from './components/RefreshApp'
import { SecureScreen } from './components/SecureScreen'
// services
import { HeadersBuilder } from './authServices/HeadersUtil'
// roles
import { AuthContext, RBAuthInitialToken } from './roles-based-auth/context'
import { TokenUtil } from './authServices/TokenUtilities'
import { RequestBuilder, HTTPMethod } from './authServices/RequestBuilder'
import { ApiAccessBuilder } from './authServices/RequestWrapper'
import { BaseAuthApiWrapper } from './authServices/BaseAuthApiWrapper'
import { Can } from './components/Can'
import {
  RBAuthErrors,
  PartialAuthApi as _PartialAuthApi,
  RBAuthBaseRoles as _RBAuthBaseRoles,
  RBAuthReactContext as _RBAuthReactContext,
  RBAuthRedirect as _RBAuthRedirect,
  RBAuthRulesInterface as _RBAuthRulesInterface,
  RBAuthStorageType as _RBAuthStorageType,
  RBAuthTokensType as _RBAuthTokensType,
  RBAuthUserModelWithRole as _RBAuthUserModelWithRole,
  UnknownAuthProcess,
} from './types'

export {
  AuthContext,
  Auth,
  RefreshApp,
  SecureScreen,
  AuthCallback,
  Can,
  TokenUtil,
  HeadersBuilder,
  RequestBuilder,
  HTTPMethod,
  ApiAccessBuilder,
  RBAuthInitialToken,
  BaseAuthApiWrapper,
  // Types
  RBAuthErrors,
}

// check this https://github.com/microsoft/TypeScript/issues/28481
export type RBAuthTokensType = _RBAuthTokensType
export type RBAuthBaseRoles = _RBAuthBaseRoles
export type RBAuthUserModelWithRole = _RBAuthUserModelWithRole
export type RBAuthStorageType = _RBAuthStorageType
export type PartialAuthApi = _PartialAuthApi
export type RBAuthRedirect = _RBAuthRedirect

/**
 * Odd types :)
 */
export type RBAuthReactContext<
  TUser extends _RBAuthUserModelWithRole<string>,
  TRules extends _RBAuthRulesInterface<string>,
  LoginType extends UnknownAuthProcess = UnknownAuthProcess,
  LogOutType extends UnknownAuthProcess = UnknownAuthProcess,
  SignUpType extends UnknownAuthProcess = UnknownAuthProcess,
  HandleAuthType extends UnknownAuthProcess = UnknownAuthProcess,
  SilentAuthType extends UnknownAuthProcess = UnknownAuthProcess,
  RefreshTokensType extends UnknownAuthProcess = UnknownAuthProcess,
  // AppApis
  TApi extends Record<string, unknown> = Record<string, unknown>
> = _RBAuthReactContext<
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
export type RBAuthRulesInterface<RoleType extends string> = _RBAuthRulesInterface<RoleType>
