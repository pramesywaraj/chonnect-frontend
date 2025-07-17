import type { UseQueryOptions } from '@tanstack/vue-query';
import { IErrorResponse } from './api-response';

export type CommonUseQueryOptions<T, U> = Omit<
  UseQueryOptions<T, IErrorResponse, U, readonly unknown[]>,
  'queryKey' | 'queryFn'
>;
