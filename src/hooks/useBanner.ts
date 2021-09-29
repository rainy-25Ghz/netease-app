import useSWR from "swr";
import { fetcher } from "../util/network";

export function useBanner() {
    const { data: bannerData, error } = useSWR("/banner", fetcher);
    return { bannerData, error };
}
