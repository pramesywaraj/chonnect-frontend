import type { UseQueryOptions } from '@tanstack/vue-query';
import { IErrorResponse } from './api-response';

export type CommonUseQueryOptions<T, U = IErrorResponse> = Omit<
  UseQueryOptions<T, U, T, readonly unknown[]>,
  'queryKey' | 'queryFn'
>;
