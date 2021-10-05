import styled from "@emotion/styled";
import {
	Pause,
	PlayArrow,
	SkipNext,
	SkipPrevious,
	VolumeUp,
} from "@mui/icons-material";
import { IconButton, LinearProgress, Slider } from "@mui/material";
import React, {
	ChangeEvent,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import useSWR from "swr";

import { useAudio } from "../hooks/useAudio";
import { useUpdate } from "../hooks/useUpdate";

import { MusicContext } from "../util/context";
import { fetcher } from "../util/network";
import { StyledListPic } from "./RecommendList";

const Layout = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	padding-right: 1rem;
	padding-left: 1rem;
	.info {
		width: 20%;
		height: 100%;
		align-items: center;
		display: flex;
		text-align: left;
		.info-text {
			margin-left: 1rem;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	.control {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		width: 60%;
		flex-direction: column;
		.progress {
			height: 1rem;
			width: 24rem;
			display: inline-flex;
			.MuiSlider-root {
				margin-left: 1rem;
				margin-right: 1rem;
			}
		}
	}
	.volume {
		display: flex;
		align-items: center;
		width: 20%;
		justify-content: center;
		.icon {
			display: flex;
			justify-content: center;
			width: 2rem;
		}
		.MuiSlider-root {
			width: 8rem;
			.MuiSlider-thumb {
				width: 1rem;
				height: 1rem;
			}
		}
	}
`;
interface Props {}

export const MusicPlayer = () => {
	const { name, artists, duration, url, currI, songIds, setCurrI } =
		useContext(MusicContext);
	const audio = useAudio();
	const [progress, setProgress] = useState(0);
	const [volume, setVolume] = useState(50);
	const { data: urlData } = useSWR(() => {
		// console.log(currI, songIds);
		if (currI >= 0 && songIds && songIds.length > 0) {
			const songId = songIds[currI];
			return `/song/url?id=${songId}`;
		} else {
			return `/song/url?id=${0}`;
		}
	}, fetcher);

	const [paused, setPaused] = useState(true);
	console.log("rerender", audio.paused);
	useEffect(() => {
		const listener1 = () => {
			setPaused(false);
		};
		const listener2 = () => {
			setPaused(true);
		};
		audio.addEventListener("play", listener1);
		audio.addEventListener("pause", listener2);
		return () => {
			audio.removeEventListener("play", listener1);
			audio.removeEventListener("pause", listener2);
		};
	}, []);

	useEffect(() => {
		if (urlData && urlData.data[0]) {
			audio.src = urlData.data[0].url;
			console.log(audio);
		}
	}, [urlData]);

	return (
		<Layout>
			<div className="info">
				<StyledListPic width={3} height={3} bdr={0.5} src={url} />
				<div className="info-text">
					<div className="name">{name}</div>
					<div className="artists">{artists}</div>
				</div>
			</div>
			<div className="control">
				<div className="btns">
					<IconButton className="prev-btn">
						<SkipPrevious></SkipPrevious>
					</IconButton>

					{!paused ? (
						<IconButton
							className="play-btn"
							onClick={() => {
								if (
									urlData &&
									urlData.data &&
									urlData.data[0]
								) {
									audio.pause();
								}
							}}
						>
							<Pause />
						</IconButton>
					) : (
						<IconButton
							className="play-btn"
							onClick={() => {
								if (
									urlData &&
									urlData.data &&
									urlData.data[0]
								) {
									audio.play();
								}
							}}
						>
							<PlayArrow />
						</IconButton>
					)}
					<IconButton
						className="next-btn"
						onClick={() => {
							audio.pause();
							setCurrI((currI + 1) % songIds.length);
						}}
					>
						<SkipNext></SkipNext>
					</IconButton>
				</div>
			</div>
			<div className="volume">
				<VolumeUp className="icon"></VolumeUp>
				<Slider
					onChange={(_, newVal) => {
						if (typeof newVal === "number") {
							audio.volume = newVal / 100;
							setVolume(newVal);
						}
					}}
					value={volume}
				/>
			</div>
		</Layout>
	);
};
