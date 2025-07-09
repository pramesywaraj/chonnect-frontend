<script lang="ts" setup>
import { useRoute } from 'vue-router';

import Navbar from '@components/Navbar/index.vue';

import { useBackNavigation } from '@/composables/useBackNavigation';

const roomId = useRoute().params.roomId as string;
const backNavigation = useBackNavigation();
</script>

<template>
  <div class="bg-background flex-auto flex flex-col">
    <Navbar :title="roomId" :is-enable-back-button="true" @click-back-button="backNavigation.goBack" />
  </div>
</template>
