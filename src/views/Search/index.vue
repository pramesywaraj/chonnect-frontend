<script lang="ts" setup>
import { ref } from 'vue';
import { PhMagnifyingGlass } from '@phosphor-icons/vue';

import Navbar from '@components/Navbar/index.vue';
import TextInput from '@components/Inputs/TextInput/index.vue';
import { User } from '@/types/user';
import { useBackNavigation } from '@composables/useBackNavigation';

import UserList from './components/UserList/index.vue';
import EmptyState from './components/EmptyState/index.vue';

import { mockUsers } from './__mock__';

const { goBack } = useBackNavigation();

const search = ref('');
const users = ref<User[]>(mockUsers);
</script>

<template>
  <div class="flex flex-col flex-auto bg-background min-h-screen">
    <Navbar title="Chat with Others" :is-enable-back-button="true" :on-click-back-button="goBack" />
    <div class="flex flex-col p-4 flex-1">
      <TextInput
        v-model="search"
        wrapper-class="ring-primary border-2 border-primary"
        placeholder="search a user"
        :icon="{ component: PhMagnifyingGlass, size: 24, class: 'text-primary' }"
      />

      <UserList v-if="!search" :users="users" />
      <EmptyState v-else />
    </div>
  </div>
</template>
