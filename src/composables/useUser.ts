import { useQuery } from '@tanstack/vue-query';

import { fetchProfile } from '@/api/user';
import { queryKeys } from '@/constants/query';
import { User } from '@/types/user';
import { CommonUseQueryOptions } from '@/types/vue-query';

export const useFetchProfile = (options?: CommonUseQueryOptions<User, User>) => {
  return useQuery({
    queryKey: queryKeys.user_profile(),
    queryFn: fetchProfile,
    ...options
  });
};
