<script setup lang="ts">
import RegisterForm from './components/RegisterForm/index.vue';
</script>

<template>
  <div class="bg-primary p-4 flex-auto flex flex-col text-white">
    <h2 class="text-white">Chonnect.</h2>

    <div class="flex-auto flex flex-col justify-center gap-2">
      <div>
        <h2>Welcome 🙌</h2>
        <p>Register to connect with others, cheers!</p>
      </div>
      <RegisterForm />
    </div>
  </div>
</template>
