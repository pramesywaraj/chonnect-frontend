import { computed, ref } from 'vue';
import { useInfiniteQuery } from '@tanstack/vue-query';

import { fetchUsers } from '@/api/user';
import { queryKeys } from '@/constants/query';
import { CursorPagination } from '@/types/api-response';
import { FetchUsersParams, User } from '@/types/user';

export function useUserSearch() {
  const searchQuery = ref('');
  const isSearching = ref(false);

  const searchParams = computed<FetchUsersParams>(() => {
    const params: FetchUsersParams = {
      limit: 10
    };

    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim();
    }

    return params;
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, refetch } = useInfiniteQuery({
    queryKey: queryKeys.user_all(searchParams.value),
    queryFn: ({ pageParam }) => {
      const params = { ...searchParams.value };
      if (pageParam) {
        params.before = pageParam;
      }

      return fetchUsers(params);
    },
    getNextPageParam: (lastPage: CursorPagination<User>) => {
      if (!lastPage.has_more || !lastPage.next_cursor) {
        return undefined;
      }

      return lastPage.next_cursor;
    },
    initialPageParam: undefined,
    enabled: true
  });

  const allUsers = computed(() => {
    if (!data.value) return [];
    return data.value.pages.flatMap(page => page.data);
  });

  const handleSearch = async (query: string) => {
    searchQuery.value = query;

    await refetch();
  };

  const loadMore = async () => {
    if (hasNextPage.value && !isFetchingNextPage.value) await fetchNextPage();
  };

  const resetSearch = async () => {
    searchQuery.value = '';

    await refetch();
  };

  return {
    searchQuery,
    isSearching,
    allUsers,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    handleSearch,
    loadMore,
    resetSearch
  };
}
