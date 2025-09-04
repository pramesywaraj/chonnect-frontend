<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PhPaperPlaneRight } from '@phosphor-icons/vue';

import Navbar from '@components/Navbar/index.vue';
import { TextAreaInput } from '@/components/Inputs';
import { IconedButton } from '@/components/Buttons';
import { useBackNavigation } from '@/composables/useBackNavigation';

import ChatBody from './components/ChatBody/index.vue';

import { useChatRoom } from '@/composables/useChatRoom';
import { useFetchRoomDetail } from '@/composables/useRoom';

const router = useRouter();
const route = useRoute();
const roomId = computed(() => route.params.roomId as string);
const backNavigation = useBackNavigation();

const {
  messages,
  messageInput,
  userId,
  handleSendMessage,
  loadMoreMessages,
  isCanSendMessage,
  isConnected,
  isFetchingMessages,
  isFetchingNextPage,
  hasNextPage
} = useChatRoom(roomId);
const { data: room, isLoading: isFetchingRoomDetailLoading } = useFetchRoomDetail(roomId.value, {
  enabled: !!roomId.value,
  refetchOnWindowFocus: false
});

const navigateToProfile = () => {
  if (!room.value) return;

  if (room.value.is_group) return router.push(`/profile/group/${room.value.id}`);

  const partner = room.value.participants.filter(user => user.id !== userId)[0];

  router.push(`/profile/user/${partner?.id}`);
};

const isLoading = computed(() => isFetchingRoomDetailLoading.value || isFetchingMessages.value);
</script>

<template>
  <div class="bg-background flex-auto flex flex-col h-screen">
    <Navbar
      :title="room?.name ?? ''"
      :is-enable-back-button="true"
      @click-back-button="backNavigation.goBack"
      @click-navbar="navigateToProfile"
    />

    <div v-if="isLoading" class="flex-1 flex items-center justify-center">
      <div class="text-text-secondary">Loading messages...</div>
    </div>

    <ChatBody
      :messages="messages"
      :has-more="hasNextPage"
      :is-loading-more="isFetchingNextPage"
      @load-more="loadMoreMessages"
    />

    <!-- Connection status indicator -->
    <div v-if="!isConnected" class="px-4 py-1 text-sm text-red-500 bg-red-50">Connecting to chat...</div>

    <div class="bg-primary p-2 flex items-center shrink-0 gap-3">
      <TextAreaInput
        v-model="messageInput"
        placeholder="Write your message here..."
        container-class="mb-0! w-full"
        :initial-height="24"
        @keydown.enter.prevent="handleSendMessage"
      />
      <IconedButton
        :icon="{ src: PhPaperPlaneRight, size: 28, weight: 'bold', class: 'text-primary' }"
        wrapper-class="bg-white p-2.5"
        :disabled="!isCanSendMessage"
        @click="handleSendMessage"
      />
    </div>
  </div>
</template>
