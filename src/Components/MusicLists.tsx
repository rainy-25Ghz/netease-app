import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useSWR, { Middleware } from "swr";
import { fetcher } from "../util/network";
import { Categories } from "./Categories";
import { StyledListPic } from "./RecommendList";

export const StyledContainer = styled.div`
	margin-top: 1rem;

	.status {
		margin-bottom: 1rem;
		font-size: 16px;
		height: 32px;
		width: 86rem;
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
		width: 86rem;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-between;
		.item {
			display: flex;
			flex-direction: column;
			width: 16rem;
			height: 20rem;
			span {
				text-align: left;
			}
		}
	}
`;

export const MusicLists = () => {
	const [currCat, setCurrCat] = useState("全部歌单");
	const setCurrCatMemo = useCallback(setCurrCat, [currCat]);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [playlists, setPlaylists] = useState<any[]>([]);
	const divRef = useRef<HTMLDivElement>(null);
	const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const res: any = await fetch(
				`/top/playlist?limit=20&cat=${currCat}&offset=${offset}`
			).then((res) => res.json());

			const { playlists: newPlaylists } = res;
			setPlaylists(newPlaylists);
			setLoading(false);
		})();
	}, [currCat]);

	useEffect(() => {
		if (offset <= 100)
			(async () => {
				setLoading(true);
				const res: any = await fetch(
					`/top/playlist?limit=20&cat=${currCat}&offset=${
						offset * 20
					}`
				).then((res) => res.json());

				const { playlists: newPlaylists } = res;
				setPlaylists([...playlists, ...newPlaylists]);
				setLoading(false);
			})();
	}, [offset]);

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
			<Categories setCurrCat={setCurrCatMemo} currCat={currCat} />
			<div className="list">
				{playlists.map(
					({ coverImgUrl, name }: any, index, playlists) => {
						return (
							<div className="item" key={name}>
								<StyledListPic
									src={coverImgUrl}
								></StyledListPic>
								<div className="name">{name}</div>
							</div>
						);
					}
				)}
			</div>
			<div ref={divRef} style={{ width: "100%", height: "2rem" }}>
				{loading && <CircularProgress></CircularProgress>}
			</div>
		</StyledContainer>
	);
};
