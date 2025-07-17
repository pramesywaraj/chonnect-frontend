import { useMutation } from '@tanstack/vue-query';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import type { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '@/types/auth';
import { login, register } from '@/api/auth';
import API_ROUTES from '@/constants/api-routes';
import { useUserStore } from '@/stores/user';

import { useFetchProfile } from './useUser';

const userStore = useUserStore();

export const useLogin = () => {
  const errorMessage = ref('');
  const router = useRouter();
  const isProfileLoading = ref(false);

  const { refetch: fetchUserProfile } = useFetchProfile({ enabled: false });

  const onLoginUser = (payload: ILoginRequest) => {
    mutation.mutate(payload);
  };

  const onLoginSuccess = async (access_token: string, refresh_token: string) => {
    isProfileLoading.value = true;

    try {
      const { data: profile } = await fetchUserProfile();
      if (!profile) throw new Error('User not found, please regist first');

      userStore.setAccessToken(access_token);
      userStore.setRefreshToken(refresh_token);
      userStore.setUser(profile);

      router.replace('/');
    } catch (err: any) {
      errorMessage.value = err?.message || err?.response?.data?.message || 'Failed to fetch user profile after login.';
    } finally {
      isProfileLoading.value = false;
    }
  };

  const mutation = useMutation<ILoginResponse, Error, ILoginRequest>({
    mutationFn: login,
    onSuccess: data => onLoginSuccess(data.access_token, data.refresh_token),
    onError: error => {
      errorMessage.value = error?.message || `Error occured when hit ${API_ROUTES.AUTH.LOGIN}`;
    }
  });

  const isLoading = computed(() => mutation.isPending.value || isProfileLoading.value);

  return {
    onLoginUser,
    isLoading,
    isError: mutation.isError,
    errorMessage
  };
};

export const useRegister = () => {
  const errorMessage = ref('');
  const router = useRouter();

  const onRegistUser = (payload: IRegisterRequest) => {
    mutation.mutate(payload);
  };

  const onRegistSuccess = () => {
    router.replace('/login');
  };

  const mutation = useMutation<IRegisterResponse, Error, IRegisterRequest>({
    mutationFn: register,
    onSuccess: () => {
      onRegistSuccess();
    },
    onError: error => {
      errorMessage.value = error?.message || `Error occured when hit ${API_ROUTES.AUTH.REGISTER}`;
    }
  });

  return {
    onRegistUser,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    errorMessage
  };
};
