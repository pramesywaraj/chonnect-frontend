<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

import Notification from '@/components/Notification/index.vue';
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
