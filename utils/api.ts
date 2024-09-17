export const fetcher = <T>(...args: [RequestInfo, RequestInit?]): Promise<T> =>
  fetch(...args).then((res) => res.json());
