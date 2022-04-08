import {
  PartialAuthApi,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  RBAuthBaseRoles,
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
export type HandleType = () => Promise<AuthResObj>;
export type LogoutType = (email: string, password: string) => Promise<unknown>;
export type SignupType = (name: string, email: string, password: string) => Promise<unknown>;
export type RefreshType = <T>() => Promise<T>;

// TODO: test handle (web based only)
export class AuthApi implements PartialAuthApi {
  static login: LoginType = async (username: string, password: string) =>
    AuthApi.authWrapper(Auth0Api.mapTokens(await Auth0Api.authorize(username, password)));

  static silent: SilentType = async () => AuthApi.authWrapper(await AuthApi.refresh());
  // {
  //   try {
  //     return await AuthApi.authWrapper(await AuthApi.refresh());
  //   } catch (error) {
  //     console.log('error', error.message);
  //   }
  // };
  static logout = () => Auth0Api.logout();
  static signup: SignupType = (name, email, password) => Auth0Api.signup(name, email, password);
  static refresh = () => Auth0Api.refresh();

  /**
   * Helpers
   */
  private static authWrapper = async <U extends RBAuthUserModelWithRole<RBAuthBaseRoles>>(
    getTokens: () => Promise<RBAuthTokensType>
  ): Promise<{
    user: U;
    tokens: RBAuthTokensType;
  }> => {
    let tokens: RBAuthTokensType = {};
    let user = anonUser;
    try {
      tokens = await getTokens();
      user = await Auth0Api.getUser(tokens.tokenType, tokens.accessToken);
    } catch (error) {}
    return {
      tokens,
      user: (user || anonUser) as unknown as U,
    };
  };
}
