<script lang="ts" setup>
import { computed, withDefaults, defineProps, useSlots, type Component } from 'vue';
import { PhArrowLeft } from '@phosphor-icons/vue';

import { IconedButton } from '@components/Buttons';

interface NavbarProps {
  title: string;
  rightContent?: Component | null;
  isEnableBackButton?: boolean;
  onClickBackButton?: () => void;
  onClickNavbar?: () => void;
}

withDefaults(defineProps<NavbarProps>(), {
  rightContent: null,
  isEnableBackButton: false,
  onClickBackButton: () => {},
  onClickNavbar: () => {}
});

const slots = useSlots();

const hasRightContent = computed(() => !!slots['right-content']);
</script>

<template>
  <nav class="flex bg-primary items-center p-4 gap-2">
    <div v-if="isEnableBackButton" class="flex items-center justify-center">
      <IconedButton
        :icon="{ src: PhArrowLeft, size: 24, weight: 'bold', class: 'text-white' }"
        @click="onClickBackButton"
      />
    </div>
    <div :class="['flex-1', !!onClickNavbar ? 'cursor-pointer' : '']" @click="onClickNavbar">
      <h2 class="text-white">{{ title }}</h2>
    </div>
    <div v-if="hasRightContent" class="flex justify-between items-center gap-3">
      <slot name="right-content" />
    </div>
  </nav>
</template>
