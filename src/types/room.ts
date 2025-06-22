import { Message } from './message';
import { User } from './user';

export interface Room {
  id: string;
  name: string;
  is_group: boolean;
  created_at: string;
  participants: User[];
  last_message: Message | null;
}
