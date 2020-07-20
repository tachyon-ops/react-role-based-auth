export class HeadersBuilder {
  headers = new Headers();
  constructor() {
    return this;
  }

  withContentTypeJson() {
    this.headers.append('Content-Type', 'application/json');
    return this;
  }

  withToken(type: string | 'Bearer', token: string) {
    this.headers.append('Authorization', `${type} ${token}`);
    return this;
  }

  build() {
    return this.headers;
  }
}
