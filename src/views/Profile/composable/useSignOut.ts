import { useRouter } from 'vue-router';

import { socketService } from '@/helpers/socket.service';
import { NotificationTypeEnum, useNotificationStore } from '@/stores/notification';
import { useUserStore } from '@/stores/user';

export default () => {
  const router = useRouter();
  const userStore = useUserStore();
  const notificationStore = useNotificationStore();

  const signOut = () => {
    try {
      // disconnect from messaging socket connection
      socketService.disconnect();

      // clear memory of user data
      userStore.clearAuth();

      notificationStore.showMessage("You're signed out", NotificationTypeEnum.SUCCESS);
      router.replace('/login');
    } catch (error) {
      console.error('Error during sign out: ', error);
      notificationStore.showMessage('Error during sign out', NotificationTypeEnum.ERROR);
    }
  };

  return { signOut };
};
