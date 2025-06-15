<script setup lang="ts">
import { useField, ErrorMessage } from 'vee-validate';
import { computed, type Component } from 'vue';

const props = defineProps({
  // only use when wrapped in a form
  name: {
    type: String,
    required: true
  },
  // for standalone use
  modelValue: {
    type: String,
    default: undefined
  },
  // common props
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

const emit = defineEmits<{
  'update:modelValue': [value: string];
  submit: [value: string];
}>();

const {
  value: formValue,
  handleChange,
  handleBlur
} = useField(props.name, undefined, {
  initialValue: props.modelValue
});

const inputValue = computed({
  get: () => (props.name ? formValue.value : props.modelValue),
  set: (value: string) => {
    if (props.name) {
      handleChange(value);
    } else {
      emit('update:modelValue', value);
    }
  }
});
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

      <input
        :id="name"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :class="['w-full bg-transparent text-text-secondary focus:outline-none placeholder:italic', fieldClass]"
        @blur="handleBlur"
      />
    </div>

    <ErrorMessage :name="name" :class="['text-danger text-sm mt-1', dengerMessageClass]" />
  </div>
</template>
