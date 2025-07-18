<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { useRegister } from '@/composables/useAuth';

import RegisterForm from './components/RegisterForm/index.vue';

const { onRegistUser, isLoading } = useRegister();
</script>

<template>
  <div class="bg-primary p-4 flex-auto flex flex-col text-white">
    <h2 class="text-white">Chonnect.</h2>

    <div class="flex-auto flex flex-col justify-center gap-2">
      <div>
        <h2>Welcome 🙌</h2>
        <p>Register to connect with others, cheers!</p>
      </div>
      <RegisterForm :is-loading="isLoading" :on-submit-regist="onRegistUser" />
    </div>

    <div class="flex justify-center">
      <p class="text-white">Already have an account? <RouterLink to="/login">Login 👋</RouterLink></p>
    </div>
  </div>
</template>
