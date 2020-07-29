import { RBAuthTokensType, HeadersBuilder, RequestBuilder, HTTPMethod } from 'react-rb-auth';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from '@env';

type RawTokensType = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: string;
  scope: string;
  token_type: string;
};

export class Auth0Api {
  private static connection = 'Username-Password-Authentication';
  // openid for id token
  // offline_access for refresh token
  private static scope = 'profile openid offline_access';

  private static auth0body = { client_id: AUTH0_CLIENT_ID, audience: AUTH0_AUDIENCE };

  static mapTokens(rawTokens: RawTokensType): RBAuthTokensType {
    return {
      accessToken: rawTokens.access_token,
      refreshToken: rawTokens.refresh_token,
      openIdToken: rawTokens.id_token,
      scope: rawTokens.scope,
      expiresIn: rawTokens.expires_in,
      tokenType: rawTokens.token_type,
    };
  }

  static authorize = (username: string, password: string): Promise<RawTokensType> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/oauth/token`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withAuth0Body({
        ...Auth0Api.auth0body,
        connection: Auth0Api.connection,
        scope: Auth0Api.scope,
        grant_type: 'password',
        username,
        password,
      })
      .buildJson();

  // api docs: https://auth0.com/docs/api/authentication#revoke-refresh-token
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
        ...Auth0Api.auth0body,
        refresh_token: tokens.refreshToken,
      })
      .buildJson();

  static signup = (name: string, email: string, password: string) =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/dbconnections/signup`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withAuth0Body({
        ...Auth0Api.auth0body,
        connection: Auth0Api.connection,
        scope: Auth0Api.scope,
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
}
