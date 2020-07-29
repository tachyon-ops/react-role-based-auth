import {
  PartialAuthApi,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  RBAuthBaseRoles,
  TokenUtil,
} from 'react-rb-auth';

import { anonUser } from '../models/user';
import { Auth0Api } from './Auth0Api';

type AuthResObj<U = RBAuthUserModelWithRole<RBAuthBaseRoles>> = {
  tokens: RBAuthTokensType;
  user: U;
};

export type LoginType = <U extends RBAuthUserModelWithRole<RBAuthBaseRoles>>(
  email: string,
  password: string
) => Promise<AuthResObj<U>>;
export type SilentType = () => Promise<AuthResObj>;
export type HandleType = () => Promise<unknown>;
export type LogoutType = (email: string, password: string) => Promise<unknown>;
export type SignupType = (name: string, email: string, password: string) => Promise<unknown>;
export type RefreshType = () => Promise<RBAuthTokensType>;

// TODO: test handle (web based only)
export class AuthApi implements PartialAuthApi {
  static login: LoginType = async (username: string, password: string) =>
    AuthApi.authWrapper(Auth0Api.mapTokens(await Auth0Api.authorize(username, password)));

  static silent: SilentType = async () =>
    AuthApi.authWrapper(
      Auth0Api.mapTokens(await Auth0Api.refresh(TokenUtil.getTokens().refreshToken))
    );

  // https://auth0.com/docs/logout
  static logout = () => {
    Auth0Api.revoke(TokenUtil.getTokens());
    return Auth0Api.logout();
  };

  static signup: SignupType = (name, email, password) => Auth0Api.signup(name, email, password);

  static refresh: RefreshType = async () =>
    Auth0Api.mapTokens(await Auth0Api.refresh(TokenUtil.getTokens().refreshToken));

  /**
   * Helpers
   */
  private static authWrapper = async <U extends RBAuthUserModelWithRole<RBAuthBaseRoles>>(
    tokens: RBAuthTokensType
  ): Promise<{
    user: U;
    tokens: RBAuthTokensType;
  }> => ({
    tokens,
    user:
      (await Auth0Api.getUser(tokens.tokenType, tokens.accessToken)) ||
      ((anonUser as unknown) as U),
  });
}
