import { useInfiniteQuery, useQuery } from '@tanstack/vue-query';

import { fetchRoomDetail, fetchRooms } from '@/api/room';
import { queryKeys } from '@/constants/query';
import { Room } from '@/types/room';
import { CursorPagination } from '@/types/api-response';
import { CommonUseQueryOptions } from '@/types/vue-query';

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

export const useFetchRoomDetail = (roomId: string, options?: CommonUseQueryOptions<Room>) => {
  return useQuery({
    queryKey: queryKeys.room_detail(roomId),
    queryFn: () => fetchRoomDetail(roomId),
    ...options,
  });
};
