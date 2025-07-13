<script setup lang="ts">
import { TextInput, PasswordInput } from '@components/Inputs';
import { PhLock, PhAt } from '@phosphor-icons/vue';
import { useForm } from 'vee-validate';

import { loginSchema } from '@/schemas';
import { RegularButton } from '@components/Buttons';
import { ILoginRequest } from '@/types/auth';

interface Props {
  isLoading: boolean;
  onSubmitLogin: (payload: ILoginRequest) => void;
}

const props = defineProps<Props>();

const { handleSubmit } = useForm({
  validationSchema: loginSchema
});

const onSubmit = handleSubmit((values: any) => {
  const formValues = values as ILoginRequest;

  props.onSubmitLogin(formValues);
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
    <RegularButton :loading="isLoading" tag="button" variant="secondary" type="submit">Login</RegularButton>
  </form>
</template>
