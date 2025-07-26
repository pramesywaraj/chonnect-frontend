import { useInfiniteQuery } from '@tanstack/vue-query';

import { fetchRooms } from '@/api/room';
import { queryKeys } from '@/constants/query';
import { Room } from '@/types/room';
import { CursorPagination } from '@/types/api-response';

export const useFetchRooms = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.user_rooms(),
    queryFn: ({ pageParam }) =>
      fetchRooms({
        limit: 10,
        before: pageParam ?? undefined
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage: CursorPagination<Room>) => lastPage.next_cursor ?? null
  });
};
