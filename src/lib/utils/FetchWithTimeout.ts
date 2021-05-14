export const DEFAULT_TIMEOUT = 7000;

export const fetchWithTimeout = (
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
  timeout = DEFAULT_TIMEOUT
) =>
  Promise.race<Promise<Response>>([
    fetch(requestInfo, requestInit),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
  ]);
