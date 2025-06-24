<script lang="ts" setup>
import Navbar from '@components/Navbar/index.vue';
import { useBackNavigation } from '@composables/useBackNavigation';

const { goBack } = useBackNavigation();
</script>

<template>
  <div class="flex flex-col flex-auto bg-background min-h-screen">
    <Navbar title="Profile" :is-enable-back-button="true" :on-click-back-button="goBack" />
  </div>
</template>
