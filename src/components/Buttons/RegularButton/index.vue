<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

const props = withDefaults(
  defineProps<{
    tag?: 'button' | 'a' | 'RouterLink';
    variant?: 'primary' | 'secondary';
    type?: 'submit' | 'button' | 'reset';
    className?: string;
    noHover?: boolean;
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    tag: 'button',
    variant: 'primary',
    type: 'button',
    className: '',
    noHover: false,
    disabled: false,
    loading: false
  }
);
const attrs = useAttrs();

const isDisabled = computed(() => props.disabled || props.loading);
const mergedAttrs = computed(() => {
  if (props.tag === 'button') {
    return {
      ...attrs,
      type: props.type,
      disabled: props.disabled || props.loading
    };
  }

  return attrs;
});

const variantClass = computed(() => {
  if (props.variant === 'primary') {
    if (isDisabled.value) {
      return 'bg-primary/70 text-white pointer-events-none opacity-60';
    }
    return props.noHover ? 'bg-primary text-white' : 'bg-primary text-white hover:bg-primary/90';
  } else {
    if (isDisabled.value) {
      return 'border border-primary text-primary bg-white/70 pointer-events-none opacity-60';
    }
    return props.noHover
      ? 'border border-primary text-primary bg-white'
      : 'border border-primary text-primary bg-white hover:bg-white/50';
  }
});

const spinnerColorClass = computed(() =>
  props.variant === 'primary' ? 'border-white border-t-transparent' : 'border-primary border-t-transparent'
);
</script>

<template>
  <component
    :is="tag"
    v-bind="mergedAttrs"
    :class="['inline-flex justify-center px-4 py-2 rounded cursor-pointer', variantClass, className]"
  >
    <span v-if="loading">
      <!-- Simple spinner (CSS) -->
      <span class="inline-block w-4 h-4 border-2 rounded-full animate-spin" :class="spinnerColorClass" />
    </span>
    <slot v-if="!loading" />
  </component>
</template>

<style lang="css" scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
