export enum HTTPMethod {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type ModeType = 'no-cors';
export class RequestBuilder {
  private route = '';
  private body: Record<string, unknown> = {};
  private headers: Headers = new Headers();
  private method: HTTPMethod = HTTPMethod.GET;
  private mode: ModeType = 'no-cors';

  constructor(route: string, private debug = false) {
    this.route = route;
    return this;
  }
  withAuth0Body(body: Record<string, unknown> = {}) {
    this.body = body;
    return this;
  }
  withBody(body: Record<string, unknown> = {}) {
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
  withMode(mode: ModeType) {
    this.mode = mode;
    return this;
  }
  private request() {
    if (this.debug) {
      const debugHeaders: Record<string, string> = {};
      this.headers.forEach((value, key) => (debugHeaders[key] = value));
      console.log(
        'will request: ',
        this.route,
        this.method,
        JSON.stringify(debugHeaders),
        JSON.stringify(this.body)
      );
    }
    return fetch(this.route, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      mode: this.mode,
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
  async buildDynamic<T>(): Promise<T> {
    const res = await this.request();
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) return res.json();
    else throw Error(await res.text());
  }
}
