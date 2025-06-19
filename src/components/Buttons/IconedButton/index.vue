<script setup lang="ts">
import { type Component } from 'vue';

interface IconedButtonProps {
  icon: {
    src: Component;
    size?: number;
    class?: string;
    weight?: 'bold' | 'fill' | 'thin' | 'light' | 'regular' | 'duotone';
  };
  wrapperClass?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  disabled?: boolean;
}

defineProps<IconedButtonProps>();
defineEmits(['click']);
</script>

<template>
  <button
    :type="type"
    :class="['inline-flex items-center justify-center rounded-full focus:outline-none cursor-pointer', wrapperClass]"
    :aria-label="ariaLabel"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <component :is="icon.src" :size="icon.size ?? 20" :class="icon.class" :weight="icon.weight ?? 'regular'" />
  </button>
</template>
