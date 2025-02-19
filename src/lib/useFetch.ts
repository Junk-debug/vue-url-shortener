import { ref } from "vue";

type Options<R extends unknown> = {
  onSuccess?: (res: R) => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
};

export function useFetch<R extends unknown, T extends unknown[]>(
  fetcherFn: (...params: T) => Promise<R>,
  { onError, onSettled, onSuccess }: Options<R> = {}
) {
  const data = ref<R | null>(null);
  const loading = ref(false);
  const error = ref<null | string>(null);

  const fetchData = async (...params: T) => {
    data.value = null;
    error.value = null;
    loading.value = true;

    try {
      const res = await fetcherFn(...params);
      data.value = res;
      onSuccess?.(res);
    } catch (err: unknown) {
      console.error("error", err);
      if (err instanceof Error) {
        error.value = err.message;
      }
      onError?.(err);
    } finally {
      loading.value = false;
      onSettled?.();
    }
  };

  return { fetchData, data, loading, error };
}
