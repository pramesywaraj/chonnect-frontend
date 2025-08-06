<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';

import Navbar from '@components/Navbar/index.vue';
import { ProfileImage } from '@components/Images';
import { RegularButton } from '@components/Buttons';

import { useBackNavigation } from '@composables/useBackNavigation';
import { Participant } from '@/types/room';
import { useUserStore } from '@/stores/user';

import DescriptionFields from './components/DescriptionFields/index.vue';
import { mockOtherUser, mockRoom } from './__mock__';
import useSignOut from './composable/useSignOut';

interface DataType {
  name: string;
  description?: string | undefined;
  email?: string | undefined;
  profile_image?: string | undefined;
  participants?: Participant[] | undefined;
}

const { goBack } = useBackNavigation();
const route = useRoute();
const userStore = useUserStore();
const { signOut } = useSignOut();
const queryClient = useQueryClient();

const profileType = computed<'group' | 'otherUser' | 'currentUser'>(() => {
  if (route.path.startsWith('/profile/group/')) return 'group';
  if (route.params.userId) return 'otherUser';
  return 'currentUser';
});

const data = computed<DataType>(() => {
  if (profileType.value === 'group')
    return {
      name: mockRoom.name,
      participants: mockRoom.participants
    };
  if (profileType.value === 'otherUser')
    return {
      name: mockOtherUser.name,
      description: mockOtherUser.description,
      email: mockOtherUser.email,
      profile_image: mockOtherUser.profile_image || ''
    };

  const user = userStore.user;

  return {
    name: user?.name || '',
    description: user?.description,
    email: user?.email,
    profile_image: user?.profile_image || ''
  };
});

const handleSignOut = async () => {
  await queryClient.clear();

  signOut();
};
</script>

<template>
  <div class="flex flex-col flex-auto min-h-screen bg-primary">
    <Navbar title="Profile" :is-enable-back-button="true" :on-click-back-button="goBack" />
    <div class="flex flex-col items-center flex-auto p-4 gap-4">
      <ProfileImage :name="data.name" :image-url="data?.profile_image" size="large" />
      <DescriptionFields :is-group="profileType === 'group'" :data="data" />
    </div>
    <div class="p-4">
      <RegularButton
        v-if="profileType === 'currentUser'"
        variant="secondary"
        type="button"
        size="large"
        class-name="w-full !text-danger"
        @click="handleSignOut"
        >Sign Out</RegularButton
      >
      <RegularButton
        v-if="profileType === 'group'"
        variant="secondary"
        type="button"
        size="large"
        class-name="w-full !text-danger"
        >Leave Group</RegularButton
      >
    </div>
  </div>
</template>
