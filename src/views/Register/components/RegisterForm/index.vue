<script setup lang="ts">
import { TextInput, PasswordInput } from '@components/Inputs';
import { PhLock, PhAt, PhUser } from '@phosphor-icons/vue';
import { useForm } from 'vee-validate';

import { registerSchema } from '@/schemas';
import { RegularButton } from '@components/Buttons';
import { IRegisterRequest } from '@/types/auth';

interface Props {
  isLoading: boolean;
  onSubmitRegist: (payload: IRegisterRequest) => void;
}

interface IFormValues extends IRegisterRequest {
  confirmPassword?: string;
}

const props = defineProps<Props>();

const { handleSubmit } = useForm({
  validationSchema: registerSchema
});

const onSubmit = handleSubmit((values: any) => {
  const formValues = values as IFormValues;

  delete formValues.confirmPassword;

  props.onSubmitRegist(formValues);
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
    <RegularButton :loading="isLoading" tag="button" variant="secondary" type="submit">Let's Chat!</RegularButton>
  </form>
</template>
