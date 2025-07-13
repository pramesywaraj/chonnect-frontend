<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { PhPaperPlaneRight } from '@phosphor-icons/vue';

import Navbar from '@components/Navbar/index.vue';
import { TextAreaInput } from '@/components/Inputs';
import { IconedButton } from '@/components/Buttons';

import { Message } from '@/types/message';

import { useBackNavigation } from '@/composables/useBackNavigation';

import ChatBody from './components/ChatBody/index.vue';

import ChatData from './__mock__/chat-data';

const roomId = useRoute().params.roomId as string;
const backNavigation = useBackNavigation();

const data = ref<Message[]>(ChatData);
</script>

<template>
  <div class="bg-background flex-auto flex flex-col h-screen">
    <Navbar :title="roomId" :is-enable-back-button="true" @click-back-button="backNavigation.goBack" />
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
