// Generated client boundary. Keep behavior-free wrappers here.
import createClient from 'openapi-fetch';
import type { paths } from './api';

export function createApiClient(baseUrl: string) {
  return createClient<paths>({ baseUrl });
}
