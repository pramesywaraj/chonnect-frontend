<script lang="ts" setup>
import { ProfileImage } from '@components/Images';
import { computed } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

import { MessageStatusEnum } from '@/types/message';
import { Room } from '@/types/room';

interface Props {
  room: Room;
  onNavigateToRoom: (room: Room) => void;
}

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);

const props = defineProps<Props>();

const roomName = computed(() => props.room.name);
const roomCreatedAt = computed(() => props.room.created_at);
const latestMessage = computed(() => props.room.last_message);

const isReaded = computed(() => latestMessage.value?.statuses.some(status => status.name === MessageStatusEnum.READ));
const isNoMessage = computed(() => !latestMessage.value);
const isMessageReaded = computed(() => (isReaded.value ? 'text-text-secondary' : 'text-text-primary'));
const latestMessageContent = computed(() => latestMessage.value?.content);
const latestMessageTime = computed(() => {
  const messageDate = dayjs(latestMessage.value?.created_at ?? roomCreatedAt.value);

  if (messageDate.isToday()) {
    return messageDate.format('HH:mm');
  } else if (messageDate.isYesterday()) {
    return 'Yesterday';
  } else {
    return messageDate.format('DD/MM/YYYY');
  }
});
</script>

<template>
  <div class="flex gap-3 cursor-pointer" @click="onNavigateToRoom(room)">
    <div class="flex-1">
      <ProfileImage :name="roomName" :image-url="latestMessage?.sender?.profile_image ?? ''" />
    </div>
    <div class="flex items-center gap-3 min-w-0 w-full">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 min-w-0">
          <p class="font-semibold text-primary truncate">{{ roomName }}</p>
          <span class="ml-auto shrink-0 text-xs text-text-secondary">{{ latestMessageTime }}</span>
        </div>
        <p v-if="isNoMessage" class="text-sm text-text-secondary italic">chat to start the conversation</p>
        <p v-else :class="['text-sm truncate', isMessageReaded]">
          {{ latestMessageContent }}
        </p>
      </div>
    </div>
  </div>
</template>
