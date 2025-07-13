<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PhPaperPlaneRight } from '@phosphor-icons/vue';

import Navbar from '@components/Navbar/index.vue';
import { TextAreaInput } from '@/components/Inputs';
import { IconedButton } from '@/components/Buttons';
import type { Message } from '@/types/message';
import type { Room } from '@/types/room';
import { useBackNavigation } from '@/composables/useBackNavigation';

import ChatBody from './components/ChatBody/index.vue';

import ChatData from './__mock__/chat-data';
import RoomData from './__mock__/room';

const router = useRouter();
const roomId = useRoute().params.roomId as string;
const userId = '49cdfbdc-c1fe-4ece-a235-4a25890c8a31';
const backNavigation = useBackNavigation();

const data = ref<Message[]>(ChatData);
const room = ref<Room>(RoomData);

const navigateToProfile = () => {
  if (room.value.is_group) return router.push(`/profile/group/${room.value.id}`);

  const partner = room.value.participants.filter(user => user.id !== userId)[0];

  router.push(`/profile/user/${partner?.id}`);
};
</script>

<template>
  <div class="bg-background flex-auto flex flex-col h-screen">
    <Navbar
      :title="room.name"
      :is-enable-back-button="true"
      @click-back-button="backNavigation.goBack"
      @click-navbar="navigateToProfile"
    />
    <ChatBody :messages="data" />

    <div class="bg-primary p-2 flex items-center shrink-0 gap-3">
      <TextAreaInput placeholder="Write your message here..." container-class="mb-0! w-full" :initial-height="24" />
      <IconedButton
        :icon="{ src: PhPaperPlaneRight, size: 28, weight: 'bold', class: 'text-primary' }"
        wrapper-class="bg-white p-2.5"
      />
    </div>
  </div>
</template>
