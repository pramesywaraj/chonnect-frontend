export default {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh'
  },
  USER: {
    PROFILE: '/user/profile',
    OTHER: (userId: string) => `/user/${userId}`
  },
  ROOM: {
    FETCH_ROOMS: '/room',
    FETCH_ROOM_DETAIL: (roomId: string) => `/room/${roomId}`
  }
};
