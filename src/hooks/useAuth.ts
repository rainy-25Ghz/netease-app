import { createContext, useContext } from "react";
import useSWR from "swr";
import { fetcher } from "../util/network";


export const logout = async () => {
  return await fetcher(`/logout`) as any;
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

interface LoginStatusContextInterface{
  loginStatus:boolean;
  uid:number|null;
}

export const LoginStatusContext = createContext<LoginStatusContextInterface>({loginStatus:false,uid:null});


