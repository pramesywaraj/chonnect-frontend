<script lang="ts" setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

import type { Message } from '@/types/message';

import ChatBubble from '../ChatBubble/index.vue';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const props = defineProps<{ messages: Message[] }>();

const sortedMessages = computed(() =>
  [...props.messages].sort((a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix())
);

const getDateLabel = (date: string) => {
  const dateObj = dayjs(date);
  if (dateObj.isToday()) return 'Today';
  if (dateObj.isYesterday()) return 'Yesterday';
  return dateObj.format('DD/MM/YYYY');
};

const isLastMessage = (idx: number) => {
  const current = sortedMessages.value?.[idx];
  if (!current) return false; // Defensive: should not happen

  const next = sortedMessages.value[idx + 1];

  // If it's the last message in the list
  if (!next) return true;

  // If the next message is on a different date
  const currentDate = dayjs(current.created_at).format('YYYY-MM-DD');
  const nextDate = dayjs(next.created_at).format('YYYY-MM-DD');
  if (currentDate !== nextDate) return true;

  // If the next message is from a different sender
  if (next.is_user_message !== current.is_user_message) return true;

  // Otherwise, not the last in the group
  return false;
};
</script>

<template>
  <div class="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-4">
    <!-- chat section -->
    <div class="flex flex-col gap-4">
      <template v-for="(message, idx) in sortedMessages" :key="message.id">
        <div
          v-if="
            idx === 0 || getDateLabel(message.created_at) !== getDateLabel(sortedMessages?.[idx - 1]?.created_at || '')
          "
          class="text-center text-text-secondary text-sm my-2"
        >
          {{ getDateLabel(message.created_at) }}
        </div>
        <ChatBubble
          :is-user="message.is_user_message"
          :is-last-message="isLastMessage(idx)"
          :time="dayjs(message.created_at).format('HH:mm')"
          :message="message.content"
        />
      </template>
    </div>
  </div>
</template>
