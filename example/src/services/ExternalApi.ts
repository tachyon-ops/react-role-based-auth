import { RequestBuilder, HeadersBuilder, HTTPMethod } from 'react-rb-auth';

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;

class ExternalApi {
  getUser = <T>(): Promise<T> =>
    new RequestBuilder(`https://${AUTH0_DOMAIN}/userinfo`)
      .withMethod(HTTPMethod.GET)
      .withHeaders(new HeadersBuilder().withRBAuthToken().build())
      .build();
}

export const GlobalAppApi = {
  external: new ExternalApi(),
};
