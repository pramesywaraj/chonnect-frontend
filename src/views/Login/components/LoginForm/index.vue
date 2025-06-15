<script setup lang="ts">
import { TextInput, PasswordInput } from '@components/Inputs';
import { PhLock, PhAt } from '@phosphor-icons/vue';
import { useForm } from 'vee-validate';

import { loginSchema } from '@/schemas';
import Button from '@components/Button/index.vue';

interface LoginFormValues {
  email: string;
  password: string;
}

const { handleSubmit } = useForm({
  validationSchema: loginSchema
});

const onSubmit = handleSubmit((values: any) => {
  const formValues = values as LoginFormValues;
});
</script>

<template>
  <form class="flex flex-col gap-2 py-4" @submit="onSubmit">
    <TextInput
      name="email"
      type="email"
      placeholder="your email"
      dengerMessageClass="text-white"
      :icon="{
        component: PhAt
      }"
    />
    <PasswordInput
      name="password"
      placeholder="your password"
      dengerMessageClass="text-white"
      :icon="{
        component: PhLock
      }"
    />
    <Button tag="button" variant="secondary" type="submit">Login</Button>
  </form>
</template>
