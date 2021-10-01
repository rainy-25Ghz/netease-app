export const fetcher = async (...args: Parameters<typeof window.fetch>) => {
    return fetch(...args).then((res) => res.json());
};
