<template>
  <div class="bg-white p-4 flex-auto flex flex-col">
    <h2 class="text-primary">Chonnect.</h2>

    <div class="flex-auto flex flex-col justify-center">
      <h1 class="text-primary">Stay hi 👋 Stay close 👊</h1>
      <p class="text-l">Where chatting feels like connecting instantly.</p>
    </div>

    <div class="flex flex-col justify-center gap-2.5">
      <RegularButton variant="primary" tag="button" @click="goToLogin"> Login </RegularButton>
      <RegularButton variant="secondary" @click="goToRegister"> Register </RegularButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RegularButton } from '@components/Buttons';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push('/login');
};

const goToRegister = () => {
  router.push('/register');
};
</script>
