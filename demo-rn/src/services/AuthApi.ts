import {
  PartialAuthApi,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  RBAuthBaseRoles,
  HeadersBuilder,
} from 'react-rb-auth';

import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from '@env';
import { TokenUtil } from 'react-rb-auth';

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

export class AuthApi implements PartialAuthApi {
  static login: LoginType = async (username: string, password: string) =>
    new Promise(async (resolve, reject) => {
      try {
        await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
          method: HTTPMethod.POST,
          headers: new HeadersBuilder().withContentTypeJson().build(),
          body: JSON.stringify({
            grant_type: 'password',
            client_id: AUTH0_CLIENT_ID,
            audience: AUTH0_AUDIENCE,
            connection: 'Username-Password-Authentication',
            username,
            password,
            // openid for id token
            // offline_access for refresh token
            scope: 'profile openid offline_access',
          }),
        }).then(async (res) => {
          if (!res.ok) reject(res.statusText);
          else {
            const rawTokens = await res.json();
            console.log('raw tokens: ', rawTokens);
            const tokens: RBAuthTokensType = mapRawTokens(rawTokens);
            const userRes = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
              method: HTTPMethod.POST,
              headers: new HeadersBuilder()
                .withContentTypeJson()
                .withToken(tokens.tokenType, tokens.accessToken)
                .build(),
            });
            const user = await userRes.json();
            // resolve tokens & user
            resolve({ tokens, user });
          }
        });
      } catch (e) {
        reject(e);
      }
    });

  // https://auth0.com/docs/logout
  static logout = () =>
    new Promise(async (resolve, reject) => {
      const res = await fetch(`https://${AUTH0_DOMAIN}/v2/logout?federated= `);
      if (res.ok) resolve(res);
      else reject({ status: res.status, statusText: res.statusText });
    });

  static signup: SignupType = async (name, email, password) => {
    console.log('going to signup!', name, email, password);
    try {
      let auth0Domain = `https://${AUTH0_DOMAIN}/dbconnections/signup`;
      const response = await fetch(auth0Domain, {
        method: HTTPMethod.POST,
        headers: new HeadersBuilder().withContentTypeJson().build(),
        body: JSON.stringify({
          client_id: AUTH0_CLIENT_ID,
          connection: 'Username-Password-Authentication',
          grant_type: 'password',
          scope: 'openid offline_access',
          device: 'mydevice',
          email,
          name,
          password,
        }),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  static handle = () =>
    new Promise((a, r) =>
      setTimeout(() => {
        console.log('going to reject handle');
        r('handle reject');
      }, TEST_TIMEOUT)
    );

  static silent = () =>
    new Promise((a, r) => {
      // this is how you can use your tokens for next session :)
      const tokens: RBAuthTokensType = TokenUtil.getTokens();


      setTimeout(() => {
        console.log('going to reject silent', tokens);
        r('silent reject');
      }, TEST_TIMEOUT);
    });
}
