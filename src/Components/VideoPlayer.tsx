import styled from "@emotion/styled";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { StyledListPic } from "./RecommendList";
const StyledContainer = styled.div`
	display: flex;
	width: 70rem;
	.vd {
        width:620px;
		.title {
			color: black;
			font-weight: 600;
			text-align: left;
			margin-bottom: 0.5rem;
		}
		.name {
            overflow: hidden;
			text-align: left;
            overflow: hidden;
		}
		.play-times {
			text-align: left;
			color: gray;
		}
	}
	.recom {
		margin-left: 2rem;
		.title {
			font-weight: 600;
			text-align: left;
		}
		.list-item {
			width: 25rem;
			height: 6rem;
			display: flex;
			align-items: center;
			.link {
				color: black;
				text-decoration: none;
				margin-left: 1rem;
				overflow: hidden;
				text-align: left;
				height: 3rem;
				text-overflow: ellipsis;
			}
		}
	}
`;

function fetcher(...urls: string[]) {
	const f = (u: string) => fetch(u).then((r) => r.json());

	if (urls.length > 1) {
		return Promise.all(urls.map(f));
	}
	return undefined;
}
export const VideoPlayer = () => {
	let { vid } = useParams<any>();
	const { data } = useSWR(
		[
			`/related/allvideo?id=${vid}`,
			`/video/detail?id=${vid}`,
			`/video/url?id=${vid}`,
		],
		fetcher
	);
	const getPlayTimes = (times: number) => {
		if (times >= 100000) {
			return `播放 ${Math.floor(times / 10000)}万次`;
		} else return `播放 ${times}次`;
	};
	return (
		<StyledContainer>
			<div className="vd">
				<div className="title">视频详情</div>
				{data && data[2] && (
					<video width={620} height={355} controls>
						<source src={data[2].urls[0].url}></source>
					</video>
				)}
				{data && <h2 className="name">{data[1].data.title}</h2>}

				{data && (
					<div className="play-times">
						{getPlayTimes(data[1].data.playTime)}
					</div>
				)}
			</div>
			<div className="recom">
				<div className="title">相关推荐</div>
				{data &&
					data[0]?.data.map((data: any) => {
						const { coverUrl, title, vid } = data;
						return (
							<div className="list-item" key={title}>
								<StyledListPic
									height={5}
									width={9}
									bdr={0.5}
									src={coverUrl}
								></StyledListPic>
								<Link className="link" to={`/videos/${vid}`}>
									{title}
								</Link>
							</div>
						);
					})}
			</div>
		</StyledContainer>
	);
};
