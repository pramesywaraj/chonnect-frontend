<template>
  <div class="bg-gray-100">
    <div class="mx-auto max-w-md min-h-screen flex flex-col w-full h-full">
      <RouterView />
    </div>
  </div>

  <Notification />
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';

import Notification from '@/components/Notification/index.vue';
</script>
