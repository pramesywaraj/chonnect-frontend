import { createRoom } from '@/api/room';
import { NotificationTypeEnum, useNotificationStore } from '@/stores/notification';
import { ICreateRoomRequest, ICreateRoomResponse } from '@/types/room';
import { useMutation } from '@tanstack/vue-query';
import API_ROUTES from '@/constants/api-routes';
import { useRouter } from 'vue-router';

const notificationStore = useNotificationStore();

const useCreateRoom = (onErrorCallback?: () => void) => {
  const router = useRouter();

  const onCreateSuccess = (response: ICreateRoomResponse) => {
    router.replace(`/room/${response.id}`);
  };

  const mutation = useMutation<ICreateRoomResponse, Error, ICreateRoomRequest>({
    mutationFn: createRoom,
    onSuccess: data => onCreateSuccess(data),
    onError: error => {
      const message = error?.message || `Error occured when hit ${API_ROUTES.ROOM.CREATE_ROOM}`;
      notificationStore.showMessage(message, NotificationTypeEnum.ERROR);

      onErrorCallback?.();
    }
  });

  const onCreateRoom = (payload: ICreateRoomRequest) => {
    mutation.mutate(payload);
  };

  return {
    isLoading: mutation.isPending.value,
    onCreateRoom
  };
};

export default useCreateRoom;
