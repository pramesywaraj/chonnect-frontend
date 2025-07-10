<script setup lang="ts">
import { useField, ErrorMessage } from 'vee-validate';
import { ref, computed, nextTick, onMounted, watch, type Component } from 'vue';

const props = defineProps({
  // only use when wrapped in a form
  name: {
    type: String,
    default: undefined
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
  wrapperClass: {
    type: String,
    default: ''
  },
  containerClass: {
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
  dangerMessageClass: {
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
  },
  initialHeight: {
    type: Number,
    default: 40
  },
  maxHeight: {
    type: Number,
    default: 160
  }
});

const textAreaRef = ref<HTMLTextAreaElement | null>(null);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  submit: [value: string];
}>();

const {
  value: formValue,
  handleChange,
  handleBlur
} = useField(props?.name ?? '', undefined, {
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

const autoResize = () => {
  if (textAreaRef.value) {
    textAreaRef.value.style.height = `${props.initialHeight}px`;
    textAreaRef.value.style.height = Math.min(textAreaRef.value.scrollHeight, props.maxHeight) + 'px';
  }
};

onMounted(() => {
  nextTick(() => {
    autoResize();
  });
});

watch(inputValue, () => {
  nextTick(() => {
    autoResize();
  });
});
</script>

<template>
  <div :class="['mb-4', containerClass]">
    <label v-if="!!label" :for="name" :class="['block text-sm font-medium text-gray-700 mb-1', labelClass]">
      {{ label }}
    </label>

    <div
      :class="[
        'flex items-center gap-3 px-3 py-2 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-primary bg-white',
        wrapperClass
      ]"
    >
      <component
        :is="icon?.component"
        v-if="icon !== null"
        :class="['text-primary shrin-0', icon?.class]"
        :size="icon?.size ?? 20"
        weight="bold"
      />

      <textarea
        :id="name"
        ref="textAreaRef"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :class="[
          'resize-none w-full bg-transparent text-text-secondary focus:outline-none placeholder:italic',
          fieldClass
        ]"
        :style="{ height: initialHeight }"
        @blur="handleBlur"
        @input="autoResize"
      />
    </div>

    <ErrorMessage v-if="!!name" :name="name" :class="['text-danger text-sm mt-1', dangerMessageClass]" />
  </div>
</template>
