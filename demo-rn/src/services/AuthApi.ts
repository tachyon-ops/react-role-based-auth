import {
  PartialAuthApi,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  RBAuthBaseRoles,
  HeadersBuilder,
} from 'react-rb-auth';

import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from '@env';
import { TokenUtil } from 'react-rb-auth';
import { RBAuthInitialUser } from '../../../src/lib/roles-based-auth/context';
import { UserModel } from '../../../src/demo/models/user';

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

enum HTTPMethod {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

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

class RequestBuilder {
  private route: string;
  private body: object;
  private headers: Headers;
  private method: HTTPMethod = HTTPMethod.GET;

  constructor(route: string) {
    this.route = route;
    return this;
  }
  withAuth0Body(body: object) {
    this.body = { ...body, client_id: AUTH0_CLIENT_ID, audience: AUTH0_AUDIENCE };
    return this;
  }
  withBody(body) {
    this.body = body;
    return this;
  }
  withHeaders(headers: Headers) {
    this.headers = headers;
    return this;
  }
  withMethod(method: HTTPMethod) {
    this.method = method;
    return this;
  }
  async build<T>(): Promise<T> {
    return fetch(this.route, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
    }).then((res) => res.json());
  }
}

class Auth0Request {
  private static connection = 'Username-Password-Authentication';
  // openid for id token
  // offline_access for refresh token
  private static scope = 'profile openid offline_access';

  static authorize = (username: string, password: string): Promise<RawTokensType> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/oauth/token`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withAuth0Body({
        connection: Auth0Request.connection,
        scope: Auth0Request.scope,
        grant_type: 'password',
        username,
        password,
      })
      .build();

  static refresh = async (refreshToken: string): Promise<RawTokensType> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/oauth/token`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withAuth0Body({ grant_type: 'refresh_token', refresh_token: refreshToken })
      .build();

  static logout = () => new RequestBuilder(`https://${AUTH0_DOMAIN}/v2/logout?federated=`).build();

  static revoke = (tokens: RBAuthTokensType) =>
    tokens.refreshToken &&
    new RequestBuilder(`https://${AUTH0_DOMAIN}/oauth/revoke`)
      .withMethod(HTTPMethod.POST)
      .withAuth0Body({
        refresh_token: tokens.refreshToken,
      })
      .build();

  static signup = (name: string, email: string, password: string) =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/dbconnections/signup`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withAuth0Body({
        connection: Auth0Request.connection,
        scope: Auth0Request.scope,
        grant_type: 'password',
        device: 'mydevice',
        email,
        name,
        password,
      })
      .build();

  static getUser = <U>(tokenType: string, accessToken: string): Promise<U> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/userinfo`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(
        new HeadersBuilder().withContentTypeJson().withToken(tokenType, accessToken).build()
      )
      .build();
}

export class AuthApi implements PartialAuthApi {
  static login: LoginType = async (username: string, password: string) =>
    AuthApi.authorizeWithTokensAndUser(
      mapRawTokens(await Auth0Request.authorize(username, password))
    );

  // https://auth0.com/docs/logout
  static logout = async () => {
    Auth0Request.revoke(TokenUtil.getTokens());
    return await Auth0Request.logout();
  };

  static signup: SignupType = Auth0Request.signup;

  static handle = () =>
    new Promise((a, r) => {
      console.log('handle logic');
      setTimeout(() => {
        console.log('going to reject handle');
        r('handle reject');
      }, TEST_TIMEOUT);
    });

  static silent = async () => {
    const { refreshToken } = TokenUtil.getTokens();
    if (!refreshToken) return;
    const rawTokens = await Auth0Request.refresh(refreshToken);
    const tokens = mapRawTokens(rawTokens);
    if (!tokens.refreshToken) tokens.refreshToken = refreshToken;
    const res = await AuthApi.authorizeWithTokensAndUser(tokens);
    return res;
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
