import { User } from './user';

export enum MessageStatusEnum {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ'
}

export interface MessageStatus {
  name: MessageStatusEnum;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  content: string;
  sender: Pick<User, 'id' | 'name' | 'profile_image'>;
  statuses: MessageStatus[];
  is_user_message: boolean;
  created_at: string;
}

export interface ISendMessageRequest {
  room_id: string;
  content: string;
}
