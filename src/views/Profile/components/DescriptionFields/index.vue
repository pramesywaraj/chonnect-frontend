<script lang="ts" setup>
import { computed } from 'vue';
import { PhUsers, PhUsersThree, PhUser, PhInfo, PhEnvelope } from '@phosphor-icons/vue';

import { Participant } from '@/types/room';

export interface ProfileDataType {
  name: string;
  description?: string;
  email?: string | undefined;
  profile_image?: string | undefined;
  participants?: Participant[];
}

const props = defineProps<{
  isGroup: boolean;
  data: ProfileDataType;
}>();

const fields = computed(() => {
  if (props.isGroup) {
    return [
      {
        icon: PhUsers,
        label: 'Group Name',
        value: props?.data?.name
      },
      {
        icon: PhInfo,
        label: 'About',
        value: props.data.description ?? '-'
      },
      {
        icon: PhUsersThree,
        label: 'Participants',
        value: props?.data?.participants?.map(participant => participant.name).join(', ')
      }
    ];
  }

  return [
    {
      icon: PhUser,
      label: 'Name',
      value: props?.data?.name
    },
    {
      icon: PhInfo,
      label: 'About',
      value: props.data.description ?? '-'
    },
    {
      icon: PhEnvelope,
      label: 'Email',
      value: props.data.email ?? '-'
    }
  ];
});
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div v-for="field in fields" :key="field.label" class="flex gap-3 items-center">
      <component :is="field.icon" size="24" class="text-secondary" weight="bold" />

      <div class="flex flex-col gap-0.5">
        <p class="text-secondary text-xs">{{ field.label }}</p>
        <p class="text-white">{{ field.value }}</p>
      </div>
    </div>
  </div>
</template>
