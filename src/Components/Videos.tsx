import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../util/network";
import { VidCategories, vidCats } from "./Categories";
import { StyledListPic } from "./RecommendList";
const StyledContainer = styled.div`
	margin-top: 1rem;
	.status {
		margin-bottom: 1rem;
		font-size: 16px;
		height: 32px;
		width: 70rem;
		display: flex;
		align-items: center;
		.wrapper {
			flex-basis: 50%;
		}
		.curr-cat {
			width: 104px;
			height: 32px;
			align-items: center;
			justify-content: center;
			display: flex;
			font-size: 16px;
			border-style: solid;
			border-radius: 16px;
			border-width: 1px;
			border-color: gray;
		}
		.cat-name {
			font-size: small;
			height: 16px;
			flex-basis: 4rem;
			user-select: none;
		}
		.selected {
			background-color: rgb(253, 245, 245);
			border-radius: 12px;
			color: rgb(236, 65, 65);
		}
	}
	.list {
		display: flex;
		width: 70rem;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-between;
		.item {
			display: flex;
			flex-direction: column;
			width: 16rem;
			height: 14rem;
			span {
				text-align: left;
			}
		}
	}
    .link{
        text-decoration:none;
        color:black;
    }
`;
interface Props {}

export const Videos = (props: Props) => {
	const [currCat, setCurrCat] = useState("最佳饭制");
	const [offset, setOffset] = useState(0);
	const [videos, setVideos] = useState<any[]>([]);
	const divRef = useRef<HTMLDivElement>(null);
	const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const item = vidCats.find(({ name }) => name === currCat);
			const res: any = await fetch(
				`/video/group?id=${item?.id}&&offset=${offset * 8}`
			).then((res) => res.json());
			const { datas } = res;
			setVideos((videos) => [...videos, ...datas]);
			setLoading(false);
		})();
	}, [offset]);
	useEffect(() => {
		(async () => {
            setVideos([]);
			setLoading(true);
			const item = vidCats.find(({ name }) => name === currCat);
			const res: any = await fetch(
				`/video/group?id=${item?.id}`
			).then((res) => res.json());
			const { datas } = res;
			setVideos(datas);
			setLoading(false);
		})();
	}, [currCat]);

	useEffect(() => {
		const $node = divRef.current as HTMLDivElement;
		intersectionObserverRef.current = new IntersectionObserver(
			(entries) => {
				console.log(entries);
				if (entries[0] && entries[0].isIntersecting) {
					setOffset((val) => (val >= 100 ? 100 : val + 1));
				}
			}
		);
		intersectionObserverRef.current.observe($node);
		return () => {
			try {
				intersectionObserverRef.current?.unobserve($node);
				intersectionObserverRef.current?.disconnect();
			} catch (e) {
				console.error(e); // nothing to do
			}
		};
	}, [divRef.current]);
	return (
		<StyledContainer>
			<VidCategories
				currCat={currCat}
				setCurrCat={setCurrCat}
			></VidCategories>
			<div className="list">
				{videos &&
					videos.map(({ data }: any, index: number) => {
						let { coverUrl, title, name,vid } = data;
						if (name) {
							title = name;
						}
						return (
							<div className="item" key={title}>
								<StyledListPic
									src={coverUrl}
									width={16}
									height={9}
								></StyledListPic>
								<div className="name">
									<Link className="link" to={`/videos/${vid}`}>{title}</Link>
								</div>
							</div>
						);
					})}
			</div>
			<div ref={divRef} style={{ width: "100%", height: "2rem" }}>
				{loading && <CircularProgress></CircularProgress>}
			</div>
		</StyledContainer>
	);
};
