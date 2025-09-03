<script lang="ts" setup>
import ProfileImage from '@/components/Images/ProfileImage/index.vue';

import { User } from '@/types/user';

defineProps<{
  users: User[];
  isLoadingMore?: boolean;
  hasMore?: boolean;
}>();

defineEmits<{
  scroll: [event: Event];
}>();

const vRipple = {
  mounted(el: HTMLElement) {
    el.style.position = el.style.position || 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      el.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 h-full overflow-y-auto mt-4" @scroll="$emit('scroll', $event)">
    <div
      v-for="user in users"
      :key="user.id"
      v-ripple
      class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-l-2xl rounded-r-lg relative overflow-hidden select-none py-2 min-h-[56px]"
    >
      <ProfileImage :name="user.name" :image-url="user?.profile_image || ''" />
      <div class="flex flex-col gap-1">
        <p class="text-primary font-medium">{{ user.name }}</p>
        <p class="text-xs text-secondary">{{ user.description }}</p>
      </div>
    </div>

    <!-- Loading indicator for next page -->
    <div v-if="isLoadingMore" class="flex justify-center items-center py-4">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ripple-effect) {
  position: absolute;
  border-radius: 9999px;
  transform: scale(0);
  background: rgba(0, 0, 0, 0.12);
  animation: ripple 500ms ease-out;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>
