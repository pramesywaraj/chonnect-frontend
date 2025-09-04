<!-- eslint-disable vue/require-default-prop -->
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import Lottie, { type AnimationItem } from 'lottie-web';

interface Props {
  animationData?: object;
  path?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loop: true,
  autoplay: true,
  speed: 1,
  width: '100%',
  height: '100%',
  className: ''
});

const container = ref<HTMLElement>();
let animation: AnimationItem | null = null;

const initAnimation = async () => {
  if (!container.value) return;

  if (animation) {
    animation.destroy();
    animation = null;
  }

  try {
    let animationData;

    if (props.animationData) animationData = props.animationData;
    else if (props.path) {
      const response = await fetch(props.path);
      animationData = await response.json();
    } else {
      console.warn('LottieAnimation: No animationData or path provided');
      return;
    }

    animation = Lottie.loadAnimation({
      container: container.value,
      renderer: 'svg',
      loop: props.loop,
      autoplay: props.autoplay,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet'
      }
    });

    if (animation) {
      animation.setSpeed(props.speed);
    }
  } catch (error) {
    console.error('Error loading Lottie animation:', error);
  }
};

watch(
  () => [props.animationData, props.path, props.loop, props.autoplay, props.speed],
  () => initAnimation(),
  { deep: true }
);

onMounted(() => {
  initAnimation();
});

onUnmounted(() => {
  if (animation) animation.destroy();
});

const play = () => animation?.play();
const pause = () => animation?.pause();
const stop = () => animation?.stop();
const goToAndStop = (value: number, isFrame?: boolean) => animation?.goToAndStop(value, isFrame);
const goToAndPlay = (value: number, isFrame?: boolean) => animation?.goToAndPlay(value, isFrame);

defineExpose({
  play,
  pause,
  stop,
  goToAndStop,
  goToAndPlay
});
</script>

<template>
  <div
    ref="container"
    :class="className"
    :style="{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height
    }"
  />
</template>
