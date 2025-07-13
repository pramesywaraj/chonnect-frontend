import type { User } from '@/types/user';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  refresh_token: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export type IRegisterResponse = Pick<User, 'id' | 'description' | 'email' | 'name' | 'profile_image' | 'joined_at'>;
