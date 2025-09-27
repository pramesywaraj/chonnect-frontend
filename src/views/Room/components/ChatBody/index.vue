<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

import type { Message } from '@/types/message';
import LottieAnimation from '@/components/LottieAnimation/index.vue';
import ChatLoadingAnimation from '@/assets/animations/empty-chat-room.json';

import ChatBubble from '../ChatBubble/index.vue';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const props = defineProps<{ messages: Message[]; hasMore?: boolean; isLoadingMore?: boolean }>();
const emit = defineEmits<{ loadMore: [] }>();

const chatContainer = ref<HTMLElement>();

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

const scrollToBottom = () => {
  if (chatContainer.value) chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
};

const handleScroll = () => {
  if (!chatContainer.value) return;

  const { scrollTop } = chatContainer.value;

  if (scrollTop < 100 && props.hasMore && !props.isLoadingMore) emit('loadMore');
};

watch(
  sortedMessages,
  () => {
    nextTick(() => {
      scrollToBottom();
    });
  },
  { deep: true }
);

// Scroll to bottom on mount
onMounted(() => {
  nextTick(() => {
    scrollToBottom();
  });
});
</script>

<template>
  <div ref="chatContainer" class="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-4" @scroll="handleScroll">
    <!-- Load more indicator -->
    <div v-if="isLoadingMore" class="text-center text-text-secondary text-sm py-2">Loading more messages...</div>

    <!-- Load more button -->
    <div v-if="hasMore && !isLoadingMore" class="text-center py-2">
      <button class="text-primary text-sm hover:underline" @click="emit('loadMore')">Load more messages</button>
    </div>

    <div v-if="messages.length === 0" class="justify-center flex flex-col flex-1 items-center gap-1">
      <LottieAnimation
        :animation-data="ChatLoadingAnimation"
        :loop="true"
        :autoplay="true"
        width="192"
        height="192"
        class="opacity-80"
      />
      <div class="max-w-[80%]">
        <p class="text-center text-secondary">No messages yet...</p>
        <p class="text-center text-secondary">Chat to start chonnecting!</p>
      </div>
    </div>

    <!-- chat section -->
    <div v-else class="flex flex-col gap-4">
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
          :message-statuses="message.statuses"
        />
      </template>
    </div>
  </div>
</template>
