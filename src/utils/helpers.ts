import { TParams } from '../types/institutions';

// for objects
export function isEmpty(data: { [index: string]: any }) {
  return Object.keys(data).length === 0;
}

export function buildURLFromQueryParams(baseUrl: string, params: TParams = {}) {
  if (isEmpty(params)) return baseUrl;

  let queryParams: string[] = [];
  Object.keys(params).forEach((key: string) =>
    queryParams.push(`${key}=${params[key]}`)
  );

  return `${baseUrl}?${queryParams.join('&')}`;
}
