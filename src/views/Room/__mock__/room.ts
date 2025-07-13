import { MessageStatusEnum } from '@/types/message';
import { type Room, ParticipantRole } from '@/types/room';

export default {
  id: 'c1065868-d486-4858-9c0e-b96aebc4e283',
  name: 'Partner B',
  is_group: false,
  created_at: '2025-07-10T07:23:35.276Z',
  participants: [
    {
      id: '49cdfbdc-c1fe-4ece-a235-4a25890c8a31',
      name: 'Partner A',
      profile_image: null,
      role: ParticipantRole.ADMIN,
      joined_at: '2025-07-10T07:23:35.294Z'
    },
    {
      id: '73e4624c-0573-4720-96c8-1b7b55c8e418',
      name: 'Partner B',
      profile_image: null,
      role: ParticipantRole.ADMIN,
      joined_at: '2025-07-10T07:23:35.294Z'
    }
  ],
  last_message: {
    id: '3dee3764-7d0f-497b-a524-b4e09839a33d',
    content: 'I beg you an apology',
    sender: {
      id: '73e4624c-0573-4720-96c8-1b7b55c8e418',
      name: 'Partner B',
      profile_image: null
    },
    statuses: [
      {
        name: MessageStatusEnum.SENT
      }
    ],
    is_user_message: false,
    created_at: '2025-07-13T05:57:41.899Z'
  }
} satisfies Room;
