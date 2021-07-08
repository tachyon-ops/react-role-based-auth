import { DEFAULT_TIMEOUT, fetchWithTimeout } from '../utils/FetchWithTimeout'

export enum HTTPMethod {
  // eslint-disable-next-line no-unused-vars
  POST = 'POST',
  // eslint-disable-next-line no-unused-vars
  GET = 'GET',
  // eslint-disable-next-line no-unused-vars
  PATCH = 'PATCH',
  // eslint-disable-next-line no-unused-vars
  PUT = 'PUT',
  // eslint-disable-next-line no-unused-vars
  DELETE = 'DELETE',
  // eslint-disable-next-line no-unused-vars
  HEAD = 'HEAD',
  // eslint-disable-next-line no-unused-vars
  CONNECT = 'CONNECT',
  // eslint-disable-next-line no-unused-vars
  TRACE = 'TRACE',
}

type ErrorHandlerType<T> = (error: T) => void

export class RequestBuilder {
  private route = ''
  private body: Record<string, unknown> | null = null
  private headers: Headers = new Headers()
  private method: HTTPMethod = HTTPMethod.GET
  private mode: RequestMode | null = null
  private errorHandling: ErrorHandlerType<any> | null = null
  private timeout: number = DEFAULT_TIMEOUT

  constructor(route: string, private debug = false) {
    this.route = route
    return this
  }

  withAuth0Body(body: Record<string, unknown> = {}) {
    this.body = body
    return this
  }

  withErrorHandling<T>(callback: ErrorHandlerType<T>) {
    this.errorHandling = callback
    return this
  }

  withBody(body: Record<string, unknown> = {}) {
    this.body = body
    return this
  }

  withHeaders(headers: Headers) {
    this.headers = headers
    return this
  }

  withMethod(method: HTTPMethod) {
    this.method = method
    return this
  }

  withMode(mode: RequestMode) {
    this.mode = mode
    return this
  }

  withTimeout(timeout: number) {
    this.timeout = timeout
    return this
  }

  private request() {
    if (this.debug) {
      const debugHeaders: Record<string, string> = {}
      this.headers.forEach((value: string, key: string) => (debugHeaders[key] = value))
      // eslint-disable-next-line no-console
      console.log(
        'will request: ',
        this.route,
        this.method,
        JSON.stringify(debugHeaders),
        JSON.stringify(this.body)
      )
    }

    const opts: { method: HTTPMethod; headers: Headers; mode?: RequestMode; body?: string } = {
      method: this.method,
      headers: this.headers,
    }
    if (this.mode) opts.mode = this.mode
    if (this.method !== HTTPMethod.GET && this.method !== HTTPMethod.HEAD && this.body)
      opts.body = JSON.stringify(this.body)
    return fetchWithTimeout(this.route, opts, this.timeout)
  }

  async build<T>(): Promise<T> {
    let result: unknown
    const res = await this.request()
    const contentType = res.headers.get('content-type')
    const success = res.ok
    if (contentType && contentType.indexOf('application/json') !== -1) result = await res.json()
    else result = (await res.text()) as unknown

    if (this.debug)
      console.log('request yielded: ', result, ' was it successfull? ', success ? 'yes' : 'no')

    if (!success && this.errorHandling) this.errorHandling(result)
    return result as T
  }
}
