<template>
  <div class="bg-white p-4 flex-auto flex flex-col">
    <h2 class="text-primary">Chonnect.</h2>

    <div class="flex-auto flex flex-col justify-center">
      <h1 class="text-primary">Stay hi 👋 Stay close 👊</h1>
      <p class="text-l">Where chatting feels like connecting instantly.</p>
    </div>

    <div class="flex flex-col justify-center gap-2.5">
      <Button variant="primary" tag="button" @click="goToLogin">Login</Button>
      <Button variant="secondary" @click="goToRegister">Register</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@components/Button/index.vue';

const goToLogin = () => {
  console.log("This button go to login");
}

const goToRegister = () => {
  console.log("This button go to register");
}
</script>
