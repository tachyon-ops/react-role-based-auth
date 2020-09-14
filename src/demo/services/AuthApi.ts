import {
  PartialAuthApi,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  RBAuthBaseRoles,
} from 'react-rb-auth';

import { anonUser } from '../models/user';
import { Auth0Api } from './Auth0Api';
import { AppRole } from '../models/role';

type AuthResObj<U = RBAuthUserModelWithRole<RBAuthBaseRoles>> = {
  tokens: RBAuthTokensType;
  user: U;
};
type UserInfoApiType = {
  user_metadata: {
    role: AppRole;
  };
};
type UserApiType<U> = {
  nickname: string;
  sub: string;
} & U;

export type LoginType = <U extends RBAuthUserModelWithRole<RBAuthBaseRoles>>(
  email: string,
  password: string
) => Promise<AuthResObj<U>>;
export type SilentType = () => Promise<AuthResObj>;
export type HandleType = () => Promise<AuthResObj>;
export type LogoutType = () => Promise<unknown>;
export type SignupType = (name: string, email: string, password: string) => Promise<unknown>;
export type RefreshType = <T>() => Promise<T>;

// TODO: test handle (web based only)
export class AuthApi implements PartialAuthApi {
  static login: LoginType = async (username: string, password: string) =>
    AuthApi.authWrapper(async () =>
      Auth0Api.mapTokens(await Auth0Api.authorize(username, password))
    );

  static silent: SilentType = async () => AuthApi.authWrapper(async () => AuthApi.refresh());
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
    try {
      const t = await getTokens();
      const user = await Auth0Api.getUser<UserApiType<U>>(t.tokenType, t.accessToken);
      console.log('user: ', user);

      // get role
      const userInfo = await Auth0Api.getUserInfo<UserInfoApiType>(
        t.tokenType,
        t.accessToken,
        user.sub
      );
      console.log('userInfo: ', userInfo);
      // TODO: if needed, we can all stuff to the user console.log('userInfo: ', userInfo);
      let role = anonUser.role;
      if (userInfo && userInfo.user_metadata && userInfo.user_metadata.role)
        role = userInfo.user_metadata.role;
      return {
        tokens: t,
        user: {
          ...(user || anonUser),
          role,
        } as U,
      };
    } catch (error) {
      console.log('authWrapper catch: ', error);
      const newUser: U = (anonUser as unknown) as U;
      return { tokens: null, user: newUser };
    }
  };
}
