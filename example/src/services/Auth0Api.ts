import { RBAuthErrors } from "react-rb-auth";
import {
  RBAuthTokensType,
  HeadersBuilder,
  RequestBuilder,
  HTTPMethod,
  TokenUtil,
} from "react-rb-auth";

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;

interface AuthError {
  error: string;
  error_description: string;
}

type RawTokensType = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: string;
  scope: string;
  token_type: string;
};

export class Auth0Api {
  private static connection = "Username-Password-Authentication";
  // openid for id token
  // offline_access for refresh token
  private static scope = "profile openid offline_access";

  private static auth0body = {
    client_id: AUTH0_CLIENT_ID,
    audience: AUTH0_AUDIENCE,
  };

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

  static authorize = (
    username: string,
    password: string
  ): Promise<RawTokensType> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/oauth/token`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withAuth0Body({
        ...Auth0Api.auth0body,
        connection: Auth0Api.connection,
        scope: Auth0Api.scope,
        grant_type: "password",
        username,
        password,
      })
      .withErrorHandling<AuthError>((res) => {
        if (res.error) throw Error(res.error);
      })
      .build();

  // api docs: https://auth0.com/docs/api/authentication#revoke-refresh-token
  static refresh = async (
    refreshToken: string = TokenUtil.getTokens().refreshToken
  ): Promise<RBAuthTokensType> => {
    if (!refreshToken || refreshToken === "") throw new Error("noRefreshToken");
    const res = await new RequestBuilder(`https://${AUTH0_DOMAIN}/oauth/token`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withBody({
        grant_type: "refresh_token",
        client_id: AUTH0_CLIENT_ID,
        refresh_token: refreshToken,
      })
      .withErrorHandling<AuthError>((res) => {
        if (res.error) {
          // eslint-disable-next-line no-console
          console.log("Auth0Api::refresh result.error: ", res.error);
          if (res.error === "invalid_grant")
            throw Error(RBAuthErrors.INVALID_GRANT);
        }
      })
      .build<RawTokensType>();

    return Auth0Api.mapTokens(res);
  };

  // https://auth0.com/docs/logout
  // await Auth0Api.revoke();
  static logout = async () =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/v2/logout`)
      .withMode("no-cors")
      .build();

  static revoke = (tokens: RBAuthTokensType = TokenUtil.getTokens()) =>
    tokens.refreshToken &&
    new RequestBuilder(`https://${AUTH0_DOMAIN}/oauth/revoke`, true)
      .withMethod(HTTPMethod.POST)
      .withBody({
        client_id: AUTH0_CLIENT_ID,
        client_secret:
          "gCZVMcdV2q9n7G7jjnZrYEwee1FdAOGV7-b7AnMhJZIzAIGBE6Fb4LMTeIr0XIn0",
        token: tokens.refreshToken,
      })
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withMode("no-cors")
      .withErrorHandling<AuthError>((res) => {
        if (res.error) throw Error(res.error);
      })
      .build();

  static signup = (name: string, email: string, password: string) =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/dbconnections/signup`)
      .withMethod(HTTPMethod.POST)
      .withHeaders(new HeadersBuilder().withContentTypeJson().build())
      .withAuth0Body({
        ...Auth0Api.auth0body,
        connection: Auth0Api.connection,
        scope: Auth0Api.scope,
        grant_type: "password",
        device: "mydevice",
        email,
        name,
        password,
      })
      .withErrorHandling<AuthError>((res) => {
        if (res.error) throw Error(res.error);
      })
      .build();

  static getUser = <U>(tokenType: string, accessToken: string): Promise<U> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/userinfo`)
      .withMethod(HTTPMethod.GET)
      .withHeaders(
        new HeadersBuilder().withToken(tokenType, accessToken).build()
      )
      .withErrorHandling<AuthError>((res) => {
        if (res.error) throw Error(res.error);
      })
      .build();

  static getUserInfo = <U>(
    tokenType: string,
    accessToken: string,
    userAuth0Id: string
  ): Promise<U> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/api/v2/users/${userAuth0Id}`)
      .withMethod(HTTPMethod.GET)
      .withHeaders(
        new HeadersBuilder()
          .withToken(tokenType, accessToken)
          .withContentTypeJson()
          .build()
      )
      .withErrorHandling<AuthError>((res) => {
        if (res.error) throw Error(res.error);
      })
      .build();
}
