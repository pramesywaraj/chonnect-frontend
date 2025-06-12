<script setup lang="ts">
import { TextInput, PasswordInput } from '@components/Inputs';
import { PhLock, PhAt, PhUser } from '@phosphor-icons/vue';
import { Form } from 'vee-validate';

import { registerSchema } from '@/schemas/register-schema';
import Button from '@components/Button/index.vue';

const onSubmit = values => {
  console.log('Form values here', values);
};
</script>

<template>
  <Form class="flex flex-col gap-2 py-4" :validation-schema="registerSchema" @submit="onSubmit">
    <TextInput
      name="email"
      type="email"
      placeholder="your email"
      :icon="{
        component: PhAt
      }"
    />
    <TextInput
      name="name"
      type="text"
      placeholder="your name"
      :icon="{
        component: PhUser
      }"
    />
    <PasswordInput
      name="password"
      placeholder="your password"
      :icon="{
        component: PhLock
      }"
    />

    <Button tag="button" variant="secondary" type="submit">Let's Get Chatting!</Button>
  </Form>
</template>
