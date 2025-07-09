<script lang="ts" setup>
defineProps<{
  isUser: boolean;
  isLastMessage: boolean;
  time: string;
  message: string;
}>();
</script>

<template>
  <div :class="['flex relative', isUser ? 'justify-end' : 'justify-start']">
    <div
      :class="[
        'flex flex-col justify-between gap-2 px-4 py-2 max-w-xs w-fit min-w-25',
        isUser
          ? `bg-primary/30 text-primary rounded-xl ${isLastMessage ? 'rounded-tr-none' : ''} text-left`
          : `bg-primary text-white rounded-xl ${isLastMessage ? 'rounded-tl-none' : ''}`
      ]"
    >
      <p>{{ message }}</p>
      <span class="block text-xs opacity-70 text-right">{{ time }}</span>
    </div>
    <div
      v-if="isLastMessage"
      :class="['chat-bubble-arrow', isUser ? 'chat-bubble-arrow-right' : 'chat-bubble-arrow-left']"
    />
  </div>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.chat-bubble-arrow {
  @apply absolute w-0 h-0;
}

.chat-bubble-arrow-right {
  @apply -right-2 border-solid;

  border-width: 8px 8px 0 0;
  border-color: rgb(var(--color-primary-rgb) / 0.3) transparent transparent transparent;
  transform: rotate(0deg);
}

.chat-bubble-arrow-left {
  @apply -left-2 border-solid;

  border-width: 0 8px 8px 0;
  border-color: transparent rgb(var(--color-primary-rgb)) transparent transparent;
  transform: rotate(0deg);
}
</style>
