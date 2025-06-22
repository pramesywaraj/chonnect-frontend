import { MessageStatusEnum } from '@/types/message';
import { Room } from '@/types/room';

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Pramesywara Jembar',
    is_group: false,
    created_at: '2025-06-21T16:21:50Z',
    participants: [
      {
        id: '1',
        name: 'Pramesywara Jembar',
        profile_image:
          'https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
        email: 'pramesywara@gmail.com',
        joined_at: '2025-06-21T16:21:50Z'
      }
    ],
    last_message: null
  },
  {
    id: '2',
    name: 'Group Komunitas Burung',
    is_group: true,
    created_at: '2025-06-21T17:21:50Z',
    participants: [
      {
        id: '1',
        name: 'Pramesywara Jembar',
        profile_image:
          'https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
        email: 'pramesywara@gmail.com',
        joined_at: '2025-06-21T17:21:50Z'
      },
      {
        id: '2',
        name: 'Asep Linggis',
        profile_image:
          'https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
        email: 'asep.linggis@gmail.com',
        joined_at: '2025-06-21T17:21:50Z'
      }
    ],
    last_message: {
      id: '1',
      content: 'Kita akan membahas tentang burung',
      sender: {
        id: '1',
        name: 'Pramesywara Jembar',
        profile_image:
          'https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
        email: 'pramesywara@gmail.com',
        joined_at: '2025-06-21T17:22:00Z'
      },
      statuses: [
        {
          id: '1',
          status: MessageStatusEnum.DELIVERED,
          read_at: '2025-06-21T17:22:00Z'
        },
        {
          id: '2',
          status: MessageStatusEnum.SENT,
          read_at: '2025-06-21T17:22:00Z'
        }
      ],
      created_at: '2025-06-21T17:22:00Z'
    }
  },
  {
    id: '3',
    name: 'Group MLM Baru',
    is_group: true,
    created_at: '2025-06-22T17:22:00Z',
    participants: [
      {
        id: '5',
        name: 'Asep Sanuji',
        description: 'Wakwaw',
        profile_image:
          'https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
        email: 'asep.sanu@gmail.com',
        joined_at: '2025-06-22T17:22:00Z'
      },
      {
        id: '6',
        name: 'Babang Tamvan',
        profile_image:
          'https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
        email: 'asep.sanu@gmail.com',
        joined_at: '2025-06-22T17:22:00Z'
      }
    ],
    last_message: {
      id: '10',
      content: 'Bagaimana kabar kalian semua guys?',
      sender: {
        id: '5',
        name: 'Asep Sanuji',
        description: 'Wakwaw',
        profile_image:
          'https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
        email: 'asep.sanu@gmail.com',
        joined_at: '2025-06-22T17:23:00Z'
      },
      statuses: [
        {
          id: '10',
          status: MessageStatusEnum.DELIVERED,
          read_at: '2025-06-22T17:23:00Z'
        },
        {
          id: '12',
          status: MessageStatusEnum.SENT,
          read_at: '2025-06-22T17:23:00Z'
        },
        {
          id: '13',
          status: MessageStatusEnum.READ,
          read_at: '2025-06-22T18:04:00Z'
        }
      ],
      created_at: '2025-06-22T18:04:00Z'
    }
  }
];
