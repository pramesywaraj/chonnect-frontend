<script lang="ts" setup>
import { computed, ref } from 'vue';

const sizeMap = {
  small: 32,
  medium: 52,
  large: 136
};

const props = defineProps<{
  imageUrl?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
}>();
const showImage = ref(true);
const bgColors = [
  'bg-red-200',
  'bg-green-200',
  'bg-blue-200',
  'bg-yellow-200',
  'bg-purple-200',
  'bg-pink-200',
  'bg-indigo-200',
  'bg-teal-200',
  'bg-orange-200',
  'bg-lime-200'
];
const textColors = [
  'text-red-700',
  'text-green-700',
  'text-blue-700',
  'text-yellow-700',
  'text-purple-700',
  'text-pink-700',
  'text-indigo-700',
  'text-teal-700',
  'text-orange-700',
  'text-lime-700'
];
const profileSize = computed(() => sizeMap[props.size ?? 'medium']);

const initials = computed(() => {
  if (!props.name) return '';
  return props.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
});

const bgClass = computed(() => (props.name ? stringToColor(props.name, bgColors) : 'bg-gray-200'));
const textClass = computed(() => (props.name ? stringToColor(props.name, textColors) : 'text-primary'));

const stringToColor = (str: string, colors: string[]) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const onImgError = () => {
  showImage.value = false;
};
</script>

<template>
  <div
    class="flex items-center justify-center rounded-full font-bold overflow-hidden"
    :class="[bgClass, textClass]"
    :style="{ width: profileSize + 'px', height: profileSize + 'px', fontSize: profileSize / 2.5 + 'px' }"
  >
    <img
      v-if="props.imageUrl && showImage"
      :src="props.imageUrl"
      :alt="props.name"
      class="object-cover w-full h-full"
      @error="onImgError"
    />
    <span v-else-if="initials">{{ initials }}</span>
  </div>
</template>
