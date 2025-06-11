<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import { ref, type Component } from 'vue';
import { PhEye, PhEyeSlash } from '@phosphor-icons/vue';

interface TextInputProps {
  name: string;
  fieldClass?: string;
  labelClass?: string;
  label?: string;
  placeholder?: string;
  icon?: {
    component: Component;
    size?: number;
    class?: string;
  } | null;
}

defineProps<TextInputProps>();

const isShow = ref(false);

const toggleShowPassword = () => (isShow.value = !isShow.value);
</script>

<template>
  <div class="mb-4">
    <label v-if="!!label" :for="name" :class="['block text-sm font-medium text-gray-700 mb-1', labelClass]">
      {{ label }}
    </label>

    <div
      class="flex items-center gap-3 px-3 py-2 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-primary bg-white"
    >
      <component
        :is="icon?.component"
        v-if="icon !== null"
        :class="['text-primary shrink-0', icon?.class]"
        :size="icon?.size ?? 20"
        weight="bold"
      />

      <Field
        :id="name"
        :name="name"
        :type="isShow ? 'text' : 'password'"
        :placeholder="placeholder"
        :class="['w-full bg-transparent text-text-secondary focus:outline-none placeholder:italic', fieldClass]"
      />

      <button class="shrink-0 text-primary" type="button" @click="toggleShowPassword">
        <component :is="isShow ? PhEye : PhEyeSlash" :size="20" weight="bold" />
      </button>
    </div>

    <ErrorMessage :name="name" class="text-red-500 text-sm mt-1" />
  </div>
</template>
