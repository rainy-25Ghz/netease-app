import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect } from "react";
import useSWR from "swr";
import { useAudio } from "../hooks/useAudio";
import { MusicContext } from "../util/context";
import { fetcher } from "../util/network";
const StyledDiv = styled.div`
	width: 86rem;
	height: 20rem;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-content: space-between;
	justify-content: space-between;
	.item {
		width: 27rem;
		height: 4rem;
		margin-bottom: 1rem;
		display: flex;
		.intro {
			margin-left: 1rem;
			display: flex;
			flex-direction: column;
			text-align: left;
			justify-content: center;
			.author {
				color: #666565b9;
			}
		}
	}
    .clicked{
        background-color: #dfdfdf;
        border-radius: 1rem;
    }
`;
interface ImgProps {
	src: string;
}
const StyledImg = styled.div<ImgProps>`
	border-radius: 1rem;
	width: 4rem;
	height: 4rem;
	background-image: url(${(props) => props.src});
`;

export const NewSongsList = () => {
	const { data, error } = useSWR("/personalized/newsong?limit=12", fetcher);
	const { setDuration, setArtists, setName, setUrl, setCurrI, currI,setSongIds } =
		useContext(MusicContext);
    useEffect(() => {
       if(data){
           setSongIds(data.result.map((item: any) =>item.id));
       }
    }, [data])
    const audio = useAudio();
	return (
		<StyledDiv>
			{data
				? data.result.map((item: any,index:number) => {
						return (
							<div
								className={index===currI?"clicked item":" item"}
								onClick={() => {
									setUrl(item.picUrl);
									setName(item.name);
									setArtists(item.song.artists[0].name);
									setCurrI(index);
                                    audio.pause()
								}}
							>
								<StyledImg src={item.picUrl}></StyledImg>
								<div className="intro">
									<span className="name">{item.name}</span>
									<span className="author">
										{item.song.artists
											.map((artist: any) => artist.name)
											.join("/")}
									</span>
								</div>
							</div>
						);
				  })
				: new Array(12).fill(null).map(() => <CircularProgress />)}
		</StyledDiv>
	);
};
