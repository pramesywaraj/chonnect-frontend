<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :class="['inline-flex justify-center px-4 py-2 rounded cursor-pointer', variantClass]"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    tag?: 'button' | 'a' | 'RouterLink';
    variant?: 'primary' | 'secondary';
  }>(),
  {
    tag: 'button',
    variant: 'primary'
  }
);

const variantClass =
  props.variant === 'primary'
    ? 'bg-primary text-white hover:bg-primary/90'
    : 'border border-primary text-primary bg-transparent hover:bg-primary/10';
</script>
