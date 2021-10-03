import styled from "@emotion/styled";
import { ArrowForwardIos } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useSWR, { Middleware } from "swr";
import { fetcher } from "../util/network";
import { StyledListPic } from "./RecommendList";
export const StyledContainer = styled.div`
	margin-top: 4rem;
	width: 73rem;
	.header {
		width: 100%;
		display: flex;
	}
	.btn {
		width: calc(73rem - 270px);
		display: flex;
		justify-content: flex-end;
	}
	.list-item {
		width: 100%;
		height: 5rem;
		display: flex;
	}
	.status-bar {
		width: 270px;
		display: flex;
		justify-content: space-around;
	}
	.play-all {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

interface StatusBarProps {
	activated: boolean;
}
const StatusTab = styled.div<StatusBarProps>`
	&:hover {
		cursor: pointer;
	}
	color: ${(props) => (props.activated ? "black" : "gray")};
`;
const tabMap = [
	{
		type: 0,
		text: "全部",
	},
	{
		type: 7,
		text: "华语",
	},
	{
		type: 96,
		text: "欧美",
	},
	{
		type: 8,
		text: "日本",
	},
	{
		type: 16,
		text: "韩国",
	},
];
const StyledButton = styled(Button)`
	width: 8rem;
	text-align: center;
	height: 2rem;
	color: white;
	background-color: rgb(236, 65, 65);
	border-radius: 1rem;
	&:hover {
		color: white;
		background-color: rgb(236, 65, 65);
	}
`;

export const PlayButton = () => {
	return (
		<div className="btn" onClick={()=>{}}>
			<StyledButton startIcon={<ArrowForwardIos />}>
				播放全部
			</StyledButton>
		</div>
	);
};
export const LatestSongs = () => {
	const [type, setType] = useState(0);
	const { data: res } = useSWR(`/top/song?type=${type}`, fetcher);
    
	return (
		<StyledContainer>
			<div className="header">
				<div className="status-bar">
					{tabMap.map(({ type: type_, text }) => {
						return (
							<StatusTab
								onClick={() => {
									setType(type_);
								}}
								activated={type === type_}
							>
								{text}
							</StatusTab>
						);
					})}
				</div>
				<PlayButton />
			</div>

			{res &&
				res?.data?.slice(0,1).map(
					({ name, album, artists, mp3Url }: any, index: number) => {
						console.log(mp3Url);
						// return <div className="i">{ name}</div>;
						const { picUrl, name: albumName } = album;
						const artistsName = artists
							.map((artist: any) => artist.name)
							.join("/");
						return (
							[<StyledListPic
								width={3.75}
								height={3.75}
								src={picUrl}
							></StyledListPic>]
						);

						{
							/* <StyledListPic
									width={3.75}
									height={3.75}
									src={picUrl}
								></StyledListPic> */
						}
						{
							/* <div className="name">{name}</div>
								<div className="artists">{artistsName}</div>
								<div className="album">{albumName}</div> */
						}
					}
				)}
		</StyledContainer>
	);
};
