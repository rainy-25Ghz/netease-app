import { useEffect } from "react";

export function useMount(fn:()=>void){
    useEffect(() => {
        fn();
    }, [])
}

export function useUnmount(fn:()=>void){
    useEffect(() => {
        return fn;
    }, [])
}