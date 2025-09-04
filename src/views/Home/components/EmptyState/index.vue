<script lang="ts" setup>
import { RegularButton } from '@components/Buttons';
import LottieAnimation from '@/components/LottieAnimation/index.vue';

import EmptyChatsAnimation from '@/assets/animations/empty-chats.json';
</script>

<template>
  <div class="flex flex-col align-start gap-5 justify-center flex-auto p-4">
    <div class="flex flex-col gap-4">
      <!-- <PhChatCircleDots size="160" class="text-primary" /> -->
      <LottieAnimation
        :animation-data="EmptyChatsAnimation"
        :loop="true"
        :autoplay="true"
        :width="260"
        :height="260"
        class="opacity-80"
      />
      <p class="text-secondary max-w-[80%]">You don't have any chat yet, start by finding people to connect with</p>
    </div>
    <RegularButton tag="a" href="/search" :no-hover="true" class-name="bg-transparent !text-primary !p-0 !w-fit">
      Search Here 👈
    </RegularButton>
  </div>
</template>
