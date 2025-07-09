<script lang="ts" setup>
import { Room } from '@/types/room';

import ChatCard from '../ChatCard/index.vue';

interface Props {
  rooms: Room[];
  onNavigateToRoom: (room: Room) => void;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col p-4 gap-6">
    <ChatCard v-for="room in rooms" :key="room.id" :room="room" :on-navigate-to-room="onNavigateToRoom" />
  </div>
</template>
