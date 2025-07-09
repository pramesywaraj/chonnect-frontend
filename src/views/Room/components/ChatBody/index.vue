<script lang="ts" setup>
import ChatBubble from '../ChatBubble/index.vue';
</script>

<template>
  <div class="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-4">
    <!-- chat section -->
    <div class="flex flex-col gap-4">
      <div class="text-center text-text-secondary text-sm my-2">04/12 2025</div>
      <ChatBubble :is-user="false" :is-last-message="true" time="10:00" message="Hello there!" />
    </div>
  </div>
</template>
