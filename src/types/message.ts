import { User } from './user';

export enum MessageStatusEnum {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ'
}

export interface MessageStatus {
  id: string;
  status: MessageStatusEnum;
  read_at: string;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  statuses: MessageStatus[];
  created_at: string;
}
