import { Message } from './message';
import { User } from './user';

export enum ParticipantRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

export interface Participant extends Pick<User, 'id' | 'name' | 'profile_image'> {
  role: ParticipantRole;
  joined_at: string;
}

export interface Room {
  id: string;
  name: string;
  is_group: boolean;
  created_at: string;
  participants: Participant[];
  last_message: Message | null;
}

export interface FetchRoomsParam {
  limit?: number;
  before?: string | undefined;
}

export interface ICreateRoomRequest {
  participant_ids: string[];
  name?: string;
}

export interface ICreateRoomResponse {
  id: string;
  name: string | null;
  is_group: boolean;
  created_at: string;
}
