export const DEFAULT_TIMEOUT = 10000;

export const fetchWithTimeout = (
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
  timeout = DEFAULT_TIMEOUT
): Promise<Response> =>
  Promise.race<Promise<Response>>([
    fetch(requestInfo, requestInit) as Promise<Response>,
    // eslint-disable-next-line promise/param-names
    new Promise((_resolve, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    ) as Promise<Response>,
  ]);
