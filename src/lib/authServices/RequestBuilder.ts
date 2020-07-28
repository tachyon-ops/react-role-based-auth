export enum HTTPMethod {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export class RequestBuilder {
  private route: string;
  private body: object;
  private headers: Headers;
  private method: HTTPMethod = HTTPMethod.GET;

  constructor(route: string, private debug = false) {
    this.route = route;
    return this;
  }
  withAuth0Body(body: object = {}) {
    this.body = body;
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
  private request() {
    if (this.debug)
      console.log(
        'will request: ',
        this.route,
        this.method,
        this.headers,
        JSON.stringify(this.body)
      );
    return fetch(this.route, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
    });
  }
  async build(): Promise<Response> {
    return this.request();
  }
  async buildJson<T>(): Promise<T> {
    return this.request().then((res) => res.json());
  }
  async buildText(): Promise<string> {
    return this.request().then((res) => res.text());
  }
}
