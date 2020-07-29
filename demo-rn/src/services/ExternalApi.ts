import { AUTH0_DOMAIN } from '@env';
import { TokenUtil, RequestBuilder, HeadersBuilder, HTTPMethod } from 'react-rb-auth';

export class AppApi {
  static getUserCheckAccessToken = (): Promise<Response> => {
    const { tokenType, accessToken } = TokenUtil.getTokens();
    return new RequestBuilder(`https://${AUTH0_DOMAIN}/userinfo`)
      .withMethod(HTTPMethod.GET)
      .withHeaders(new HeadersBuilder().withToken(tokenType, accessToken).build())
      .build();
  };
}
