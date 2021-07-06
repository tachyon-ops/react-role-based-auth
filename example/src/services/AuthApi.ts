import {
  PartialAuthApi,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  RBAuthBaseRoles,
  RBAuthInitialToken,
} from 'react-rb-auth'

import { anonUser } from '../models/user'
import { Auth0Api } from './Auth0Api'
import { AppRole } from '../models/role'

type AuthResObj<U = RBAuthUserModelWithRole<RBAuthBaseRoles>> = {
  tokens: RBAuthTokensType
  user: U
}
type UserInfoApiType = {
  user_metadata: {
    role: AppRole
  }
}
type UserApiType<U> = {
  nickname: string
  sub: string
} & U

export type LoginType = <U extends RBAuthUserModelWithRole<RBAuthBaseRoles>>(
  email: string,
  password: string
) => Promise<AuthResObj<U>>
export type SilentType = () => Promise<AuthResObj>
export type HandleType = () => Promise<AuthResObj>
export type LogoutType = () => Promise<unknown>
export type SignupType = (name: string, email: string, password: string) => Promise<unknown>
export type RefreshType = <T>() => Promise<T>

// TODO: test handle (web based only)
export class AuthApi implements PartialAuthApi {
  static login: LoginType = async (username: string, password: string) =>
    AuthApi.authWrapper(async () =>
      Auth0Api.mapTokens(await Auth0Api.authorize(username, password))
    )

  static silent: SilentType = async () => AuthApi.authWrapper(async () => AuthApi.refresh())
  static logout = () => Auth0Api.logout()
  static signup: SignupType = (name, email, password) => Auth0Api.signup(name, email, password)
  static refresh = () => Auth0Api.refresh()

  /**
   * Helpers
   */
  private static authWrapper = async <U extends RBAuthUserModelWithRole<RBAuthBaseRoles>>(
    getTokens: () => Promise<RBAuthTokensType>
  ): Promise<{
    user: U
    tokens: RBAuthTokensType
  }> => {
    let tokens: RBAuthTokensType = RBAuthInitialToken
    let user = anonUser as unknown as U
    try {
      tokens = await getTokens()
      const apiUser = await Auth0Api.getUser<UserApiType<U>>(tokens.tokenType, tokens.accessToken)
      if (apiUser && apiUser.sub) {
        // get role
        const userInfo = await Auth0Api.getUserInfo<UserInfoApiType>(
          tokens.tokenType,
          tokens.accessToken,
          apiUser.sub
        )
        user = { ...(apiUser || anonUser), role: AuthApi.getRole(userInfo) }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('authWrapper catch: ', error)
    }

    return {
      tokens,
      user,
    }
  }

  private static getRole = (userInfo: UserInfoApiType) => {
    let role = anonUser.role
    if (userInfo && userInfo.user_metadata && userInfo.user_metadata.role)
      role = userInfo.user_metadata.role
    return role
  }
}
