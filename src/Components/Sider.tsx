import { useContext, useState } from "react";
import useSWR from "swr";
import { LoginStatusContext } from "../hooks/useAuth";
import { fetcher } from "../util/network";
import { SiderBar } from "./SiderBar";
import { SiderLink } from "./SiderLink";
import { SiderTitle } from "./SiderTitle";
const linkData = [
	{ path: "/findmusic", text: "发现音乐" },
	{ path: "/personalFM", text: "私人FM" },
];
const linkDataLogin = [
	{ path: "/findmusic", text: "发现音乐" },
	{ path: "/personalFM", text: "私人FM" },
	{ path: null, text: "收藏的音乐" },
];
export const Sider = () => {
    const [index,setIndex]=useState(0);
	const loginData = useContext(LoginStatusContext);
	const { data: listData, error } = useSWR(
		() => `/user/playlist?uid=${loginData.uid}`,
		fetcher
	);
	return (
		<SiderBar>
			{!loginData.loginStatus &&
				linkData.map(({ path, text },i) => {
					return <SiderLink path={path} text={text} activated={i===index} onClick={()=>{setIndex(i)}}></SiderLink>;
				})}
			{loginData.loginStatus &&
				linkDataLogin.map(({ path, text },i) => {
                    if(path)
					return <SiderLink path={path} text={text} activated={i===index} onClick={()=>{setIndex(i)}}></SiderLink>;
                    else
                    return <SiderTitle>{text}</SiderTitle>
				})}
			{loginData.loginStatus && listData && (
				<p>{listData?.playlist?.length}</p>
			)}
		</SiderBar>
	);
};
