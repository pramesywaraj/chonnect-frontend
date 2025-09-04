import { computed, type ComputedRef, onMounted, onUnmounted, ref, watch } from 'vue';
import { useInfiniteQuery, useMutation } from '@tanstack/vue-query';

import { NotificationTypeEnum, useNotificationStore } from '@/stores/notification';
import { useUserStore } from '@/stores/user';
import { socketService } from '@/helpers/socket.service';
import type { Message } from '@/types/message';
import type { Room } from '@/types/room';
import type { CursorPagination } from '@/types/api-response';

import { MESSAGE_SOCKET, ROOM_SOCKET } from '@/enums/socket';
import { fetchMessagesOnRoom, postMessage } from '@/api/message';
import { queryKeys } from '@/constants/query';

export const useChatRoom = (roomId: ComputedRef<string>) => {
  const userStore = useUserStore();
  const notificationStore = useNotificationStore();

  const messages = ref<Message[]>([]);
  const messageInput = ref('');

  const {
    data: messagesData,
    isLoading: isFetchingMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: queryKeys.messages_on_room(roomId.value),
    queryFn: ({ pageParam }) => fetchMessagesOnRoom(roomId.value, { limit: 20, before: pageParam ?? undefined }),
    initialPageParam: null,
    getNextPageParam: (lastPage: CursorPagination<Message>) => lastPage.next_cursor ?? null,
    enabled: !!roomId.value
  });

  watch(
    messagesData,
    newData => {
      if (newData) {
        // Flatten all pages and set messages
        const allMessages = newData.pages.flatMap(page => page.data);
        messages.value = allMessages;
      }
    },
    { immediate: true }
  );

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => postMessage({ room_id: roomId.value, content }),
    onSuccess: () => {
      messageInput.value = '';
    },
    onError: error => {
      notificationStore.showMessage(error?.message || 'Failed to send message', NotificationTypeEnum.ERROR);
    }
  });

  const handleSendMessage = () => {
    const content = messageInput.value.trim();
    if (!content || sendMessageMutation.isPending.value) return;

    sendMessageMutation.mutate(content);
  };

  const loadMoreMessages = () => {
    if (hasNextPage.value && !isFetchingMessages.value) fetchNextPage();
  };

  const addMessage = (message: Message) => {
    const existingMessage = messages.value.find(m => m.id === message.id);
    if (!existingMessage) {
      message.is_user_message = message.sender.id === userStore.user?.id;
      messages.value.push(message);
    }
  };

  const setupEventListeners = () => {
    socketService.onMessage((message: Message) => {
      addMessage(message);
    });

    socketService.onRoomLastMessageUpdate((data: Room) => {
      console.log('Room last message updated:', data);
    });
  };

  const cleanupEventListeners = () => {
    socketService.off(MESSAGE_SOCKET.NEW_MESSAGE);
    socketService.off(ROOM_SOCKET.ROOM_LAST_MESSAGE_UPDATE);
  };

  // Watch for roomId changes to join/leave rooms
  watch(
    roomId,
    (newRoomId, oldRoomId) => {
      if (oldRoomId) {
        console.log(`Leaving room: ${oldRoomId}`);
        socketService.leaveRoom(oldRoomId);
      }
      if (newRoomId) {
        console.log(`Joining room: ${newRoomId}`);
        socketService.joinRoom(newRoomId);
      }
    },
    { immediate: true }
  );

  // Watch for connection state and join room when connected
  watch(socketService.connectionState, isConnected => {
    if (isConnected && roomId.value) {
      console.log('Socket connected, joining room:', roomId.value);
      socketService.joinRoom(roomId.value);
    }
  });

  onMounted(() => {
    setupEventListeners();
  });

  onUnmounted(() => {
    console.log('CHECK UNMOUNT');
    if (roomId.value) {
      console.log(`Leaving room on unmount: ${roomId.value}`);
      socketService.leaveRoom(roomId.value);
    }

    cleanupEventListeners();
  });

  const isCanSendMessage = computed(() => messageInput.value.trim() && !sendMessageMutation.isPending.value);

  return {
    messages,
    messageInput,
    roomId,
    userId: userStore.user?.id,
    handleSendMessage,
    loadMoreMessages,
    isCanSendMessage,
    isConnected: socketService.connectionState,
    isFetchingMessages,
    isFetchingNextPage,
    hasNextPage
  };
};
