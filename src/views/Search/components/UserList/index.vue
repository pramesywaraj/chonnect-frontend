<script lang="ts" setup>
import ProfileImage from '@/components/Images/ProfileImage/index.vue';

import { User } from '@/types/user';

defineProps<{
  users: User[];
}>();
</script>

<template>
  <div class="flex flex-col gap-4 mt-4">
    <div
      v-for="user in users"
      :key="user.id"
      class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-l-2xl rounded-r-lg"
    >
      <ProfileImage :name="user.name" :image-url="user.profile_image" />
      <div class="flex flex-col gap-1">
        <p class="text-primary font-medium">{{ user.name }}</p>
        <p class="text-xs text-secondary">{{ user.description }}</p>
      </div>
    </div>
  </div>
</template>
