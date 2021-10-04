import styled from "@emotion/styled";
import {
	Pause,
	PlayArrow,
	SkipNext,
	SkipPrevious,
	VolumeUp,
} from "@mui/icons-material";
import { IconButton, LinearProgress, Slider } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

import { MusicContext } from "../util/context";
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
            .MuiSlider-root{
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
	const [isPlaying, setIsPlaying] = useState(false);
	const { name, artists, duration, url } = useContext(MusicContext);
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
					<IconButton
						className="play-btn"
						onClick={() => {
							setIsPlaying((val) => !val);
						}}
					>
						{isPlaying ? <Pause /> : <PlayArrow />}
					</IconButton>
					<IconButton className="next-btn">
						<SkipNext></SkipNext>
					</IconButton>
				</div>
				<div className="progress">
					<span className="dur">{" 00:00 "}</span>
					<Slider size="small" defaultValue={50} />
					<span className="dur">{duration}</span>
				</div>
			</div>
			<div className="volume">
				<VolumeUp className="icon"></VolumeUp>
				<Slider defaultValue={50} />
			</div>
		</Layout>
	);
};
