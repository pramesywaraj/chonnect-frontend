import { User } from '@/types/user';
import { ParticipantRole, Room } from '@/types/room';
import { MessageStatusEnum } from '@/types/message';

export const mockCurrentUser: User = {
  id: '1',
  name: 'Pramesywara Jembar',
  email: 'pramesywara@gmail.com',
  description: 'Frontend Developer',
  profile_image: 'https://randomuser.me/api/portraits/men/1.jpg',
  joined_at: '2023-01-01T10:00:00Z'
};

export const mockOtherUser: User = {
  id: '2',
  name: 'Agus Cipung',
  email: 'agus.cipung@gmail.com',
  description: 'Backend Developer',
  profile_image: 'https://randomuser.me/api/portraits/men/2.jpg',
  joined_at: '2023-01-01T10:00:00Z'
};

export const mockRoom: Room = {
  id: '1',
  name: 'Vue Enthusiasts',
  is_group: true,
  created_at: '2023-01-01T10:00:00Z',
  participants: [
    {
      id: '1',
      name: 'Pramesywara Jembar',
      profile_image: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: ParticipantRole.ADMIN,
      joined_at: '2023-01-01T10:00:00Z'
    },
    {
      id: '2',
      name: 'Asep Linggis',
      profile_image: 'https://randomuser.me/api/portraits/men/2.jpg',
      role: ParticipantRole.MEMBER,
      joined_at: '2023-01-01T10:05:00Z'
    }
  ],
  last_message: {
    id: '101',
    content: 'Welcome to the group!',
    sender: {
      id: '1',
      name: 'Pramesywara Jembar',
      profile_image: 'https://randomuser.me/api/portraits/men/1.jpg',
      email: 'pramesywara@gmail.com',
      joined_at: '2023-01-01T10:00:00Z'
    },
    statuses: [
      {
        id: '201',
        status: MessageStatusEnum.DELIVERED,
        read_at: '2023-01-01T10:10:00Z'
      }
    ],
    created_at: '2023-01-01T10:10:00Z'
  }
};
