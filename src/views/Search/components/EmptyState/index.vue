<script lang="ts" setup>
import { PhMagnifyingGlass } from '@phosphor-icons/vue';
</script>

<template>
  <div class="flex flex-col flex-auto items-center justify-center gap-4">
    <PhMagnifyingGlass size="128" class="text-primary" />
    <div class="flex flex-col items-center justify-center gap-2">
      <p class="text-primary text-lg font-medium">No User Found</p>
      <p class="text-secondary text-sm text-center">
        We couldn't find any users matching your search. Please try again with different keywords.
      </p>
    </div>
  </div>
</template>
