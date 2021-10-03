import styled from "@emotion/styled";
import { ArrowForwardIos } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import React, {
	Dispatch,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import useSWR, { Middleware } from "swr";
import { fetcher } from "../util/network";
import { StyledListPic } from "./RecommendList";
import EqualizerIcon from "@mui/icons-material/Equalizer";
export const StyledContainer = styled.div`
	margin-top: 2rem;
	width: 73rem;
	.header {
		width: 100%;
		display: flex;
		margin-bottom: 1rem;
	}
	.btn {
		width: calc(73rem - 270px);
		display: flex;
		justify-content: flex-end;
	}
	.list-item {
		&:hover {
			background-color: rgb(239, 239, 239);
		}
		padding-left: 2rem;
		padding-right: 2rem;
		width: 100%;
		height: 5rem;
		display: flex;
		align-items: center;
		.i {
			text-align: left;
			justify-self: flex-start;
			width: 2rem;
			color: #b9b9b9;
		}
		.equalizer {
			justify-self: flex-start;
			width: 2rem;
			color: rgb(236, 65, 65);
		}
		.name {
			margin-left: 1rem;
			width: 10rem;
			text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
		}
		.name-red {
			margin-left: 1rem;
			width: 7rem;
			text-align: left;
			color: rgb(236, 65, 65);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
		}
		.artists {
			margin-left: 22rem;
			width: 16rem;
			color: #b9b9b9;
			text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
		}
		.album {
			width: calc(100% - 58.75rem);
			color: #b9b9b9;
			text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
		}
		.dur {
			text-align: left;
			width: 5rem;
			color: #b9b9b9;
		}
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
interface PlayButtonProps {
	onClick: () => void;
}

export const PlayButton = ({ onClick }: PlayButtonProps) => {
	return (
		<div className="btn" onClick={onClick}>
			<StyledButton startIcon={<ArrowForwardIos />}>
				播放全部
			</StyledButton>
		</div>
	);
};
export const LatestSongs = () => {
	const [songIds, setSongIds] = useState<number[]>([]);
	const [songId, setSongId] = useState(0);
	const [type, setType] = useState(0);
	const { data: res } = useSWR(`/top/song?type=${type}`, fetcher);
	useEffect(() => {
		res && setSongIds(res.data.map(({ id }: any) => id));
	}, [res]);
	console.log(songId, songIds.slice(0, 5));
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
				<PlayButton
					onClick={() => {
						songIds.length && setSongId(songIds[0]);
					}}
				/>
			</div>

			{res &&
				res?.data.map(
					(
						{ name, album, artists, id, duration }: any,
						index: number
					) => {
						// return <div className="i">{ name}</div>;
						const { blurPicUrl: picUrl, name: albumName } = album;
						const artistsName = artists
							.map((artist: any) => artist.name)
							.join("/");

						const minutes = Math.floor(duration / 60000);
						const seconds =
							Math.floor(duration / 1000) - minutes * 60;

						return (
							<div
								key={id}
								className="list-item"
								style={{
									backgroundColor: `${
										index % 2 === 0 && "#f5f5f5"
									}`,
								}}
								onDoubleClick={() => {
									setSongId(id);
								}}
							>
								{songId === id ? (
									<EqualizerIcon className="equalizer" />
								) : (
									<div className="i">{index}</div>
								)}
								<StyledListPic
									width={3.75}
									height={3.75}
									src={picUrl}
									bdr={0.5}
								></StyledListPic>
								{songId === id ? (
									<div className="name-red">{name}</div>
								) : (
									<div className="name">{name}</div>
								)}
								<div className="artists">{artistsName}</div>
								<div className="album">{albumName}</div>
								<div className="dur">{`${minutes}:${
									seconds < 10 ? `0${seconds}` : seconds
								}`}</div>
							</div>
						);
					}
				)}
			{!res && <CircularProgress />}
		</StyledContainer>
	);
};
