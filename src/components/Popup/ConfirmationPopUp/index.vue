<script lang="ts" setup>
import { computed } from 'vue';

import { RegularButton } from '@/components/Buttons';

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    loading?: boolean;
  }>(),
  {
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    variant: 'info',
    loading: false
  }
);

const emit = defineEmits<{
  confirm: [];
  cancel: [];
  close: [];
}>();

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
  emit('close');
};

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget && !props.loading) {
    emit('close');
  }
};
const confirmButtonClass = computed(() => {
  if (props.variant === 'danger') {
    return 'bg-red-500 hover:bg-red-600 text-white';
  }
  return '';
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click="handleBackdropClick"
      >
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div v-if="isOpen" class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <!-- Header -->
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ title }}
              </h3>
            </div>

            <!-- Message -->
            <div class="mb-6">
              <p class="text-gray-600">
                {{ message }}
              </p>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 justify-end">
              <RegularButton variant="secondary" :disabled="loading" @click="handleCancel">
                {{ cancelText }}
              </RegularButton>
              <RegularButton
                variant="primary"
                :class-name="confirmButtonClass"
                :loading="loading"
                @click="handleConfirm"
              >
                {{ confirmText }}
              </RegularButton>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
