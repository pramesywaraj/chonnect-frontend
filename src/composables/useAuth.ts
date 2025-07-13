import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';

import type { ILoginRequest, ILoginResponse } from '@/types/auth';
import { login } from '@/api/auth';
import API_ROUTES from '@/constants/api-routes';
import { ISuccessResponse } from '@/types/api-response';

export const useLogin = () => {
  const errorMessage = ref('');
  const mutation = useMutation<ISuccessResponse<ILoginResponse>, Error, ILoginRequest>({
    mutationFn: login,
    onSuccess: data => {
      const response = data.data;

      localStorage.setItem('token', response.token);
      localStorage.setItem('refresh_token', response.refresh_token);
    },
    onError: error => {
      errorMessage.value = error?.message || `Error occured when hit ${API_ROUTES.AUTH.LOGIN}`;
    }
  });

  const onLoginUser = (payload: ILoginRequest) => {
    mutation.mutate(payload);
  };

  return {
    onLoginUser,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    errorMessage
  };
};
