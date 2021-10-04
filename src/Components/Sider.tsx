import { useContext, useState } from "react";
import { useLocation, useRouteMatch } from "react-router";
import useSWR from "swr";
import { LoginStatusContext } from "../hooks/useAuth";
import { fetcher } from "../util/network";
import { SiderBar } from "./SiderBar";
import { SiderLink } from "./SiderLink";
import { SiderTitle } from "./SiderTitle";
const linkData = [
	{ path: "/findmusic", text: "发现音乐" },
	{ path: "/videos", text: "视频" },
];
const linkDataLogin = [
	{ path: "/findmusic", text: "发现音乐" },
	{ path: "/videos", text: "视频" },
	{ path: null, text: "收藏的音乐" },
];
export const Sider = () => {
	const [index, setIndex] = useState(0);
	const loginData = useContext(LoginStatusContext);
	const { data: listData, error } = useSWR(
		() => `/user/playlist?uid=${loginData.uid}`,
		fetcher
	);
	const location=useLocation();
	
	return (
		<SiderBar>
			{!loginData.loginStatus &&
				linkData.map(({ path, text }, i) => {
					return (
						<SiderLink
							key={text}
							path={path}
							text={text}
							activated={location.pathname.indexOf(path)!==-1}
							
						></SiderLink>
					);
				})}
			{loginData.loginStatus &&
				linkDataLogin.map(({ path, text }, i) => {
					if (path)
						return (
							<SiderLink
								key={text}
								path={path}
								text={text}
								activated={location.pathname.indexOf(path)!==-1}
							></SiderLink>
						);
					else return <SiderTitle key={text}>{text}</SiderTitle>;
				})}
			{loginData.loginStatus && listData && (
				<p>{listData?.playlist?.length}</p>
			)}
		</SiderBar>
	);
};
