<script lang="ts" setup>
import { watch } from 'vue';
import { RouterView } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

import Notification from '@/components/Notification/index.vue';
import { useUserStore } from './stores/user';
import { socketService } from './helpers/socket.service';

const userStore = useUserStore();

watch(
  () => userStore.accessToken,
  token => {
    if (token) socketService.connect();
    else socketService.disconnect();
  },
  { immediate: true }
);
</script>

<template>
  <div class="bg-gray-100">
    <div class="mx-auto max-w-md min-h-screen flex flex-col w-full h-full">
      <RouterView />
    </div>
  </div>

  <Notification />
  <VueQueryDevtools position="top" button-position="relative" />
</template>
