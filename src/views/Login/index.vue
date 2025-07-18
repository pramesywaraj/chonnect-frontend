<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { useLogin } from '@/composables/useAuth';

import LoginForm from './components/LoginForm/index.vue';

const { onLoginUser, isLoading } = useLogin();
</script>

<template>
  <div class="bg-primary p-4 flex-auto flex flex-col text-white">
    <h2 class="text-white">Chonnect.</h2>

    <div class="flex-auto flex flex-col justify-center gap-2">
      <h2 class="text-white">Welcome Back 👋</h2>
      <LoginForm :is-loading="isLoading" :on-submit-login="onLoginUser" />
    </div>

    <div class="flex justify-center">
      <p class="text-white">Don't have an account? <RouterLink to="/register">Register here 👈</RouterLink></p>
    </div>
  </div>
</template>
