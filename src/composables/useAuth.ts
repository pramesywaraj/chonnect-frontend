import { useMutation } from '@tanstack/vue-query';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import type { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '@/types/auth';
import { login, register } from '@/api/auth';
import API_ROUTES from '@/constants/api-routes';
import { useUserStore } from '@/stores/user';
import { useNotificationStore, NotificationTypeEnum } from '@/stores/notification';

import { useFetchProfile } from './useUser';

const userStore = useUserStore();
const notificationStore = useNotificationStore();

export const useLogin = () => {
  const router = useRouter();
  const isProfileLoading = ref(false);

  const { refetch: fetchUserProfile } = useFetchProfile({ enabled: false });

  const onLoginUser = (payload: ILoginRequest) => {
    mutation.mutate(payload);
  };

  const onLoginSuccess = async () => {
    isProfileLoading.value = true;

    try {
      const { data: profile } = await fetchUserProfile();
      if (!profile) throw new Error('User not found, please regist first');

      userStore.setUser(profile);

      router.replace('/');
    } catch (err: any) {
      const message = err?.message || err?.response?.data?.message || 'Failed to fetch user profile after login.';
      notificationStore.showMessage(message, NotificationTypeEnum.ERROR);
    } finally {
      isProfileLoading.value = false;
    }
  };

  const mutation = useMutation<ILoginResponse, Error, ILoginRequest>({
    mutationFn: login,
    onSuccess: data => {
      userStore.setAccessToken(data.access_token);
      userStore.setRefreshToken(data.refresh_token);

      onLoginSuccess();
    },
    onError: error => {
      const message = error?.message || `Error occured when hit ${API_ROUTES.AUTH.LOGIN}`;
      notificationStore.showMessage(message, NotificationTypeEnum.ERROR);
    }
  });

  const isLoading = computed(() => mutation.isPending.value || isProfileLoading.value);

  return {
    onLoginUser,
    isLoading,
    isError: mutation.isError
  };
};

export const useRegister = () => {
  const router = useRouter();

  const onRegistUser = (payload: IRegisterRequest) => {
    mutation.mutate(payload);
  };

  const onRegistSuccess = () => {
    notificationStore.showMessage(
      "You've successfully created your account, please login first and enjoy!",
      NotificationTypeEnum.SUCCESS
    );
    router.replace('/login');
  };

  const mutation = useMutation<IRegisterResponse, Error, IRegisterRequest>({
    mutationFn: register,
    onSuccess: () => {
      onRegistSuccess();
    },
    onError: error => {
      const message = error?.message || `Error occured when hit ${API_ROUTES.AUTH.REGISTER}`;
      notificationStore.showMessage(message, NotificationTypeEnum.ERROR);
    }
  });

  return {
    onRegistUser,
    isLoading: mutation.isPending,
    isError: mutation.isError
  };
};
