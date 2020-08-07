import { AUTH0_DOMAIN } from '@env';
import { TokenUtil, RequestBuilder, HeadersBuilder, HTTPMethod } from 'react-rb-auth';

class ExternalApi {
  getUser = (): Promise<Response> => {
    const { tokenType, accessToken } = TokenUtil.getTokens();
    return new RequestBuilder(`https://${AUTH0_DOMAIN}/userinfo`)
      .withMethod(HTTPMethod.GET)
      .withHeaders(new HeadersBuilder().withToken(tokenType, accessToken).build())
      .build();
  };
}

export const GlobalAppApi = {
  external: new ExternalApi(),
};
