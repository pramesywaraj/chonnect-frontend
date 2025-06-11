<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import { type Component } from 'vue';

interface TextInputProps {
  name: string;
  fieldClass?: string;
  labelClass?: string;
  label?: string;
  type?: 'text' | 'email';
  inputType?: 'input' | 'textarea';
  placeholder?: string;
  icon?: {
    component: Component;
    size?: number;
    class?: string;
  } | null;
}

defineProps<TextInputProps>();
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
        :class="['text-primary shrin-0', icon?.class]"
        :size="icon?.size ?? 20"
        weight="bold"
      />

      <Field
        :id="name"
        :name="name"
        :type="type"
        :as="inputType"
        :placeholder="placeholder"
        :class="['w-full bg-transparent text-text-secondary focus:outline-none placeholder:italic', fieldClass]"
      />
    </div>

    <ErrorMessage :name="name" class="text-red-500 text-sm mt-1" />
  </div>
</template>
