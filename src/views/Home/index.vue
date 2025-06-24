<script setup lang="ts">
import { PhChatCircleDots, PhUserCircle } from '@phosphor-icons/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { IconedButton } from '@components/Buttons';
import Navbar from '@components/Navbar/index.vue';

import { Room } from '@/types/room';

import EmptyState from './components/EmptyState/index.vue';
import ChatList from './components/ChatList/index.vue';
import { mockRooms } from './__mock__';

const rooms = ref<Room[]>(mockRooms);
const router = useRouter();

const onNavigateToProfile = () => {
  console.log('onNavigateToProfile');
};

const onNavigateToSearchChat = () => {
  router.push('/search');
};
</script>

<template>
  <div class="bg-background flex-auto flex flex-col">
    <Navbar title="Messages">
      <template #right-content>
        <IconedButton
          :icon="{ src: PhChatCircleDots, size: 28, weight: 'bold', class: 'text-white' }"
          @click="onNavigateToSearchChat"
        />
        <IconedButton
          :icon="{ src: PhUserCircle, size: 28, weight: 'bold', class: 'text-white' }"
          @click="onNavigateToProfile"
        />
      </template>
    </Navbar>
    <EmptyState v-if="rooms.length === 0" />
    <ChatList v-else :rooms="rooms" />
  </div>
</template>
