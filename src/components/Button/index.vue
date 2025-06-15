<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

const props = withDefaults(
  defineProps<{
    tag?: 'button' | 'a' | 'RouterLink';
    variant?: 'primary' | 'secondary';
    type?: 'submit' | 'button' | 'reset';
    className?: string;
  }>(),
  {
    tag: 'button',
    variant: 'primary',
    type: 'button',
    className: ''
  }
);
const attrs = useAttrs();

const mergedAttrs = computed(() => {
  if (props.tag === 'button') {
    return {
      ...attrs,
      type: props.type
    };
  }

  return attrs;
});

const variantClass =
  props.variant === 'primary'
    ? 'bg-primary text-white hover:bg-primary/90'
    : 'border border-primary text-primary bg-white hover:bg-white/50';
</script>

<template>
  <component
    :is="tag"
    v-bind="mergedAttrs"
    :class="['inline-flex justify-center px-4 py-2 rounded cursor-pointer', variantClass, className]"
  >
    <slot />
  </component>
</template>
