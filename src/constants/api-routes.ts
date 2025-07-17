export default {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  USER: {
    PROFILE: '/user/profile',
    OTHER: (userId: string) => `/user/${userId}` 
  }
};
