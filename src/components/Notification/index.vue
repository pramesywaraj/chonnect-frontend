<script setup lang="ts">
import { computed } from 'vue';
import { PhX } from '@phosphor-icons/vue';

import { useNotificationStore, NotificationTypeEnum } from '@/stores/notification';

const notificationStore = useNotificationStore();

const message = computed(() => notificationStore.message);
const type = computed(() => notificationStore.type);
const visible = computed(() => notificationStore.visible);

const typeClass = computed(() => {
  switch (type.value) {
    case NotificationTypeEnum.ERROR:
      return 'bg-red-500/80 text-white';
    case NotificationTypeEnum.SUCCESS:
      return 'bg-green-500/80 text-white';
    case NotificationTypeEnum.INFO:
      return 'bg-blue-500/80 text-white';
    default:
      return '';
  }
});

const hideMessage = () => {
  notificationStore.hideMessage();
};
</script>

<template>
  <Transition name="fade-slide">
    <div v-if="visible" :class="['notification', typeClass]">
      <span class="text-sm">{{ message }}</span>
      <button @click="hideMessage"><PhX :size="16" weight="bold" /></button>
    </div>
  </Transition>
</template>

<style lang="css" scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Example notification styling */
.notification {
  position: fixed;
  top: 2rem;
  z-index: 1000;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;

  gap: 1rem;

  margin: 0 1rem 0 1rem;
}
</style>
