<script setup lang="ts">
import { PhChatCircleDots, PhUserCircle } from '@phosphor-icons/vue';

import { IconedButton } from '@components/Buttons';
import Navbar from '@components/Navbar/index.vue';

const onNavigateToProfile = () => {
  console.log('onNavigateToProfile');
};

const onNavigateToSearchChat = () => {
  console.log('onNavigateToSearchChat');
};
</script>

<template>
  <div class="bg-background flex-auto flex flex-col">
    <Navbar title="Messages">
      <template #right-content>
        <IconedButton
          :icon="{ src: PhChatCircleDots, size: 28, weight: 'bold', class: 'text-white' }"
          @click="onNavigateToSearchChat"
        />
        <IconedButton
          :icon="{ src: PhUserCircle, size: 28, weight: 'bold', class: 'text-white' }"
          @click="onNavigateToProfile"
        />
      </template>
    </Navbar>
    <div class="flex flex-col bg-background p-4">
      <h1>Home</h1>
    </div>
  </div>
</template>
