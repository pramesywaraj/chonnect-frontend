export const queryKeys = {
  user_profile: () => ['user', 'profile'],
  user_other: (userId: string) => ['user', 'other', userId],
  user_rooms: () => ['rooms']
};
