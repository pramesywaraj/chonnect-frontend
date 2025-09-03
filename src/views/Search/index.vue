<script lang="ts" setup>
import { ref, watch } from 'vue';
import { PhMagnifyingGlass } from '@phosphor-icons/vue';
import { debounce } from 'lodash-es';

import Navbar from '@components/Navbar/index.vue';
import TextInput from '@components/Inputs/TextInput/index.vue';
import { useBackNavigation } from '@composables/useBackNavigation';
import ConfirmationPopUp from '@components/Popup/ConfirmationPopUp/index.vue';
import { User } from '@/types/user';

import UserList from './components/UserList/index.vue';
import EmptyState from './components/EmptyState/index.vue';
import { useUserSearch } from './composables/useUserSearch';
import useCreateRoom from './composables/useCreateRoom';
import { ICreateRoomRequest } from '@/types/room';

const { goBack } = useBackNavigation();
const { allUsers, isLoading, isFetchingNextPage, hasNextPage, handleSearch, loadMore, resetSearch } = useUserSearch();
const { isLoading: isCreatingRoom, onCreateRoom } = useCreateRoom(() => handleClosePopUp());

const search = ref('');
const showConfirm = ref(false);
const selectedUser = ref<User | null>(null);

const debouncedSearch = debounce(async (searchTerm: string) => {
  await handleSearch(searchTerm);
}, 300);

watch(search, newValue => {
  if (newValue.trim() === '') resetSearch();
  else debouncedSearch(newValue);
});

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  const { scrollTop, scrollHeight, clientHeight } = target;

  if (scrollHeight - scrollTop <= clientHeight * 1.5) loadMore();
};

const handleSelectUser = (user: User) => {
  showConfirm.value = true;
  selectedUser.value = user;
};

const handleConfirm = () => {
  if (!selectedUser.value) return;
  // handle 1-o-1 room
  const payload: ICreateRoomRequest = {
    participant_ids: [selectedUser.value?.id]
  };

  onCreateRoom(payload);
};

const handleClosePopUp = () => {
  showConfirm.value = false;
  selectedUser.value = null;
};
</script>

<template>
  <div class="flex flex-col h-screen bg-background">
    <Navbar title="Chat with Others" :is-enable-back-button="true" :on-click-back-button="goBack" />
    <div class="flex flex-col p-4 flex-1 min-h-0">
      <TextInput
        v-model="search"
        wrapper-class="ring-primary border-2 border-primary"
        placeholder="search a user"
        :icon="{ component: PhMagnifyingGlass, size: 24, class: 'text-primary' }"
      />

      <UserList
        v-if="!isLoading && allUsers.length > 0"
        :users="allUsers"
        :is-loading-more="isFetchingNextPage"
        :has-more="hasNextPage"
        @select-user="handleSelectUser"
        @scroll="handleScroll"
      />
      <EmptyState v-else-if="!isLoading && allUsers.length === 0" />
    </div>
  </div>

  <ConfirmationPopUp
    :is-open="showConfirm"
    :message="`Are you sure you want to chat with ${selectedUser?.name}?`"
    :loading="isCreatingRoom"
    @close="handleClosePopUp"
    @confirm="handleConfirm"
  />
</template>
