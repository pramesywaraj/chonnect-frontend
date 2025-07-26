<script setup lang="ts">
import { PhChatCircleDots, PhUserCircle } from '@phosphor-icons/vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { IconedButton, RegularButton } from '@components/Buttons';
import Navbar from '@components/Navbar/index.vue';

import { Room } from '@/types/room';

import { useFetchRooms } from '@/composables/useRoom';

import EmptyState from './components/EmptyState/index.vue';
import ChatList from './components/ChatList/index.vue';

const router = useRouter();

const { data, hasNextPage, fetchNextPage } = useFetchRooms();
const allRooms = computed(() => data.value?.pages.flatMap(page => page.data) ?? []);

const onNavigateToProfile = () => {
  router.push('/profile');
};

const onNavigateToSearchChat = () => {
  router.push('/search');
};

const onNavigateToRoom = (room: Room) => {
  router.push(`/room/${room.id}`);
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
    <EmptyState v-if="allRooms?.length === 0" />
    <ChatList v-else :rooms="allRooms" :on-navigate-to-room="onNavigateToRoom" />
    <RegularButton v-if="hasNextPage" @click="fetchNextPage">Fetch Next</RegularButton>
  </div>
</template>
