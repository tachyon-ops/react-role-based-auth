import {
  PartialAuthApi,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  RBAuthBaseRoles,
  HeadersBuilder,
  RequestBuilder,
  HTTPMethod,
} from 'react-rb-auth';

import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from '@env';
import { TokenUtil, RBAuthInitialToken } from 'react-rb-auth';

export type LoginType = <U extends RBAuthUserModelWithRole<RBAuthBaseRoles>>(
  email: string,
  password: string
) => Promise<{
  user: U;
  tokens: RBAuthTokensType;
}>;
export type LogoutType = (email: string, password: string) => Promise<unknown>;
export type SignupType = (name: string, email: string, password: string) => Promise<unknown>;
export type HandleType = () => Promise<unknown>;
export type SilentType = () => Promise<unknown>;

type RawTokensType = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: string;
  scope: string;
  token_type: string;
};
const mapRawTokens = (rawTokens: RawTokensType): RBAuthTokensType => ({
  accessToken: rawTokens.access_token,
  refreshToken: rawTokens.refresh_token,
  openIdToken: rawTokens.id_token,
  scope: rawTokens.scope,
  expiresIn: rawTokens.expires_in,
  tokenType: rawTokens.token_type,
});

const TEST_TIMEOUT = 2000;

// api docs: https://auth0.com/docs/api/authentication#revoke-refresh-token

class Auth0Request {
  private static connection = 'Username-Password-Authentication';
  // openid for id token
  // offline_access for refresh token
  private static scope = 'profile openid offline_access';

  private static auth0body = { client_id: AUTH0_CLIENT_ID, audience: AUTH0_AUDIENCE };

  static authorize = (username: string, password: string): Promise<RawTokensType> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/oauth/token`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withAuth0Body({
        ...Auth0Request.auth0body,
        connection: Auth0Request.connection,
        scope: Auth0Request.scope,
        grant_type: 'password',
        username,
        password,
      })
      .buildJson();

  static refresh = async (refreshToken: string): Promise<RawTokensType> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/oauth/token`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withBody({
        grant_type: 'refresh_token',
        client_id: AUTH0_CLIENT_ID,
        refresh_token: refreshToken,
      })
      .buildJson();

  static logout = () =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/v2/logout?federated=`).buildText();

  static revoke = (tokens: RBAuthTokensType) =>
    tokens.refreshToken &&
    new RequestBuilder(`https://${AUTH0_DOMAIN}/oauth/revoke`)
      .withMethod(HTTPMethod.POST)
      .withAuth0Body({
        ...Auth0Request.auth0body,
        refresh_token: tokens.refreshToken,
      })
      .buildJson();

  static signup = (name: string, email: string, password: string) =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/dbconnections/signup`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withAuth0Body({
        ...Auth0Request.auth0body,
        connection: Auth0Request.connection,
        scope: Auth0Request.scope,
        grant_type: 'password',
        device: 'mydevice',
        email,
        name,
        password,
      })
      .buildJson();

  static getUser = <U>(tokenType: string, accessToken: string): Promise<U> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/userinfo`)
      .withMethod(HTTPMethod.GET)
      .withHeaders(new HeadersBuilder().withToken(tokenType, accessToken).build())
      .buildJson();

  static getRefreshedUser = <U>(tokenType: string, accessToken: string): Promise<Response> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/userinfo`)
      .withMethod(HTTPMethod.GET)
      .withHeaders(new HeadersBuilder().withToken(tokenType, accessToken).build())
      .build();
}

export class AuthApi implements PartialAuthApi {
  static login: LoginType = async (username: string, password: string) =>
    AuthApi.authorizeWithTokensAndUser(
      mapRawTokens(await Auth0Request.authorize(username, password))
    );

  // https://auth0.com/docs/logout
  static logout = () => Auth0Request.logout();

  static signup: SignupType = (name, email, password) => Auth0Request.signup(name, email, password);

  static getUser = (t: RBAuthTokensType) =>
    new Promise((r) =>
      setTimeout(async () => {
        const result = await Auth0Request.getRefreshedUser(t.tokenType, t.accessToken);
        if (result.ok) r(await result.json());
        r(result);
      }, 2000)
    );

  static silent: SilentType = async () => {
    const { refreshToken } = TokenUtil.getTokens();
    if (!refreshToken) return { tokens: RBAuthInitialToken, user: null };
    return AuthApi.authorizeWithTokensAndUser(
      mapRawTokens(await Auth0Request.refresh(refreshToken))
    );
  };

  /**
   * Helpers
   */
  private static authorizeWithTokensAndUser = async <
    U extends RBAuthUserModelWithRole<RBAuthBaseRoles>
  >(
    tokens: RBAuthTokensType
  ): Promise<{
    user: U;
    tokens: RBAuthTokensType;
  }> => ({ tokens, user: await Auth0Request.getUser(tokens.tokenType, tokens.accessToken) });
}
