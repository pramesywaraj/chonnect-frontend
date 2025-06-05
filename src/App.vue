<template>
  <div class="bg-gray-100">
    <div class="mx-auto max-w-md min-h-screen flex flex-col w-full h-full">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>
