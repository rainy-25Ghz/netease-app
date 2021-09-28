import useSWR from "swr";

const fetcher = async (...args: Parameters<typeof window.fetch>) => {
  return fetch(...args).then((res) => res.json());
};
export const logout = async () => {
  return await fetch(`/logout`) as any;
};
export const login = async (phone: string, password: string) => {
  const res = await fetch(
    `/login/cellphone?phone=${phone}&password=${password}`
  ).then((res) => res.json());
  return res as any;
};
export const checkCookie=()=>{
  return document.cookie.indexOf("MUSIC_U=")!==-1;
}
// export const useAuth = () => {
//   const key = `/login/status`;
//   const { data, error, mutate } = useSWR(key, fetcher);
//   let loginStatus = false;
//   console.log(data?.data);
//   if (data?.data?.account) {
//     loginStatus = true;
//   }
//   return {
//     loginStatus: loginStatus,
//     isLoading: !error && !data,
//     isError: error,
//     mutate,
//     key,
//   };
// };
