export const queryKeys = {
  user_profile: () => ['user', 'profile'],
  user_other: (userId: string) => ['user', 'other', userId],
  user_rooms: () => ['rooms'],
  room_detail: (roomId: string) => ['room', roomId],
  messages_on_room: (roomId: string) => ['messages', roomId]
};
