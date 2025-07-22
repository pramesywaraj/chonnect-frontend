export default {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh'
  },
  USER: {
    PROFILE: '/user/profile',
    OTHER: (userId: string) => `/user/${userId}`
  }
};
