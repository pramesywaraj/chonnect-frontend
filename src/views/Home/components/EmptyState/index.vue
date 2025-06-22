<script lang="ts" setup>
import { PhChatCircleDots } from '@phosphor-icons/vue';
import { RegularButton } from '@components/Buttons';
</script>

<template>
  <div class="flex flex-col align-start gap-5 justify-center flex-auto p-4">
    <div class="flex flex-col gap-4">
      <PhChatCircleDots size="160" class="text-primary" />
      <p class="text-secondary">You don't have any chat yet, start by finding people to connect with</p>
    </div>
    <RegularButton tag="a" href="/search" :no-hover="true" class-name="bg-transparent !text-primary !p-0 !w-fit">
      Search Here 👈
    </RegularButton>
  </div>
</template>
