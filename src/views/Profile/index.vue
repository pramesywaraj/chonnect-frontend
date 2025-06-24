<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Navbar from '@components/Navbar/index.vue';
import { ProfileImage } from '@components/Images';
import { RegularButton } from '@components/Buttons';

import { useBackNavigation } from '@composables/useBackNavigation';
import { Participant } from '@/types/room';

import DescriptionFields from './components/DescriptionFields/index.vue';
import { mockCurrentUser, mockOtherUser, mockRoom } from './__mock__';

interface DataType {
  name: string;
  description?: string;
  email?: string | undefined;
  profile_image?: string | undefined;
  participants?: Participant[];
}

const { goBack } = useBackNavigation();
const route = useRoute();

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
      profile_image: mockOtherUser.profile_image
    };
  return {
    name: mockCurrentUser.name,
    description: mockCurrentUser.description,
    email: mockCurrentUser.email,
    profile_image: mockCurrentUser.profile_image
  };
});
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
