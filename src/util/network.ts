export const fetcher = async (...args: Parameters<typeof window.fetch>) => {
    return fetch(...args).then((res) => res.json());
};
export const fetcherAll=(token:string,...urls:string[])=>{
    console.log("token"+token);
    return Promise.all(urls.map(url=>fetcher(url)));
}
// fn1("token",...["/a","/b","/c"]);

// export const fetcherAll = async ()