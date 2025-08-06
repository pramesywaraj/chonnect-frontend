import { useQuery } from '@tanstack/vue-query';

import { fetchOtherProfile, fetchProfile } from '@/api/user';
import { queryKeys } from '@/constants/query';
import { User } from '@/types/user';
import { CommonUseQueryOptions } from '@/types/vue-query';

export const useFetchProfile = (options?: CommonUseQueryOptions<User>) => {
  return useQuery({
    queryKey: queryKeys.user_profile(),
    queryFn: fetchProfile,
    ...options
  });
};

export const useFetchOtherProfile = (userId: string, options?: CommonUseQueryOptions<User>) => {
  return useQuery({
    queryKey: queryKeys.user_other(userId),
    queryFn: () => fetchOtherProfile(userId),
    enabled: !!userId,
    ...options
  });
};
