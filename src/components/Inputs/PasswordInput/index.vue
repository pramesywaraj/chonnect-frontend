<script setup lang="ts">
import { ErrorMessage, useField } from 'vee-validate';
import { ref, type Component } from 'vue';
import { PhEye, PhEyeSlash } from '@phosphor-icons/vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  fieldClass: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  labelClass: {
    type: String,
    default: ''
  },
  dengerMessageClass: {
    type: String,
    default: ''
  },
  type: {
    type: String as () => 'text' | 'email',
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  icon: {
    type: Object as () => {
      component: Component;
      size?: number;
      class?: string;
    } | null,
    default: null
  }
});

const { value } = useField(() => props.name);

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

      <input
        :id="name"
        v-model="value"
        :type="isShow ? 'text' : 'password'"
        :placeholder="placeholder"
        :class="['w-full bg-transparent text-text-secondary focus:outline-none placeholder:italic', fieldClass]"
      />

      <button class="shrink-0 text-primary" type="button" @click="toggleShowPassword">
        <component :is="isShow ? PhEye : PhEyeSlash" :size="20" weight="bold" />
      </button>
    </div>

    <ErrorMessage :name="name" :class="['text-danger text-sm mt-1', dengerMessageClass]" />
  </div>
</template>
