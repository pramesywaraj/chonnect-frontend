import { defineStore } from 'pinia';
import type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): AuthState => ({
    user: null,
    access_token: null,
    refresh_token: null
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    setAccessToken(token: string) {
      this.access_token = token;
    },
    setRefreshToken(refreshToken: string) {
      this.refresh_token = refreshToken;
    },
    clearAuth() {
      this.user = null;
      this.access_token = null;
      this.refresh_token = null;
    }
  },
  getters: {
    accessToken: state => state.access_token,
    refreshToken: state => state.refresh_token
  },
  persist: true
});
