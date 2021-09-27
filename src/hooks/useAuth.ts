import useSWR from "swr";

const fetcher = async (...args: Parameters<typeof window.fetch>) => {
  return fetch(...args).then((res) => res.json());
};
export const logout = async () => {
  await fetch(`/logout`);
};
export const useAuth = (phone: string, password: string) => {
  const key = `/login/cellphone?phone=${phone}&password=${password}`;
  const { data, error,mutate } = useSWR(
    key,
    fetcher
  );
  return {
    login: data?.code === 200,
    isLoading: !error && !data,
    isError: error,
    mutate,
    key
  };
};
