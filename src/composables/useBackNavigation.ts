import { useRouter } from 'vue-router';

export const useBackNavigation = (fallbackPath: string = '/') => {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackPath);
    }
  };

  return { goBack };
};
