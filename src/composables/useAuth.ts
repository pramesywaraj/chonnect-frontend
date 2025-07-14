import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import type { ILoginRequest, ILoginResponse } from '@/types/auth';
import { login } from '@/api/auth';
import API_ROUTES from '@/constants/api-routes';
import { ISuccessResponse } from '@/types/api-response';
import { User } from '@/types/user';

const settedUser = ref<User | null>(null);

export const useLogin = () => {
  const errorMessage = ref('');
  const router = useRouter();

  const onLoginUser = (payload: ILoginRequest) => {
    mutation.mutate(payload);
  };

  const onLoginSuccess = () => {
    router.replace('/');
  };

  const mutation = useMutation<ISuccessResponse<ILoginResponse>, Error, ILoginRequest>({
    mutationFn: login,
    onSuccess: data => {
      const response = data.data;

      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);

      onLoginSuccess();
    },
    onError: error => {
      errorMessage.value = error?.message || `Error occured when hit ${API_ROUTES.AUTH.LOGIN}`;
    }
  });

  return {
    onLoginUser,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    errorMessage
  };
};

export const useUser = () => {
  const setUser = (user: User) => {
    settedUser.value = user;
    localStorage.setItem('user', JSON.stringify(user));
  };

  const getUser = () => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) settedUser.value = JSON.parse(storedUser);
  };

  const clearUser = () => {
    settedUser.value = null;
    localStorage.removeItem('user');
  };

  return {
    user: settedUser,
    setUser,
    getUser,
    clearUser
  };
};
