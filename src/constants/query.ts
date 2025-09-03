import { FetchUsersParams } from '@/types/user';

export const queryKeys = {
  user_profile: () => ['user', 'profile'],
  user_other: (userId: string) => ['user', 'other', userId],
  user_rooms: () => ['rooms'],
  user_all: (searchParams: FetchUsersParams) => ['users', searchParams],
  room_detail: (roomId: string) => ['room', roomId],
  messages_on_room: (roomId: string) => ['messages', roomId]
};
