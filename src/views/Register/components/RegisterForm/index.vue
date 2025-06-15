<script setup lang="ts">
import { TextInput, PasswordInput } from '@components/Inputs';
import { PhLock, PhAt, PhUser } from '@phosphor-icons/vue';
import { useForm } from 'vee-validate';

import { registerSchema } from '@/schemas/register-schema';
import Button from '@components/Button/index.vue';

interface RegisterFormValues {
  email: string;
  name: string;
  password: string;
}

const { handleSubmit } = useForm({
  validationSchema: registerSchema
});

const onSubmit = handleSubmit((values: any) => {
  const formValues = values as RegisterFormValues;
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
    <TextInput
      name="name"
      type="text"
      placeholder="your name"
      dengerMessageClass="text-white"
      :icon="{
        component: PhUser
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
    <PasswordInput
      name="confirmPassword"
      placeholder="confirm your password"
      dengerMessageClass="text-white"
      :icon="{
        component: PhLock
      }"
    />
    <Button tag="button" variant="secondary" type="submit">Let's Get Chatting!</Button>
  </form>
</template>
