import styled from "@emotion/styled";
import { Avatar, CircularProgress } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import { getDur } from "../util/math";
import { fetcher } from "../util/network";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledListPic } from "./RecommendList";
import { MusicContext } from "../util/context";
import { useAudio } from "../hooks/useAudio";
const StyledDiv = styled.div`
	width: 100%;
	height: 100%;
	.header {
		margin-left: 2rem;
		display: flex;
		.info {
			display: flex;
			flex-direction: column;
			width: 100%;
			text-align: left;
			margin-left: 1rem;
			.creator {
				display: flex;
				align-items: center;
				color: gray;
			}
		}
	}
`;
const StyledTable = styled(Table)`
	width: 100%;
	color: black;
	.table-body {
		width: 100%;
	}
	.table-row {
		&:hover {
			background: #e4e3e378;
		}
		width: 100%;
		.i {
			padding-left: 2rem;
			width: 4rem;
			color: gray;
		}
		.name {
			width: 36%;
			font-weight: 600;
		}
		.r-name {
			width: 36%;
			font-weight: 600;
			color: rgb(234, 54, 54);
		}
		.artist {
			width: 17%;
			color: gray;
		}
		.album {
			width: 25%;
			color: gray;
			div {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.dur {
			width: calc(100% - 6rem - 36% - 17% - 20%);
			color: gray;
			text-align: right;
			padding-right: 2rem;
		}
	}
`;
const getTrackIdsUrl = (data: any) =>
	data?.playlist?.trackIds
		.map(({ id }: any) => id)
		.slice(0, 200)
		.reduce((accumulator: string, currentValue: string) => {
			return accumulator + currentValue + ",";
		}, "/song/detail?ids=")
		.slice(0, -1);
const getSongIds = (data: any) =>
	data?.playlist?.trackIds.map(({ id }: any) => id).slice(0, 200);
export const MusicList = () => {
	const { id } = useParams<any>();
	const { data: listData } = useSWR(`/playlist/detail?id=${id}`, fetcher);
	const trackIdsUrl = useMemo(() => getTrackIdsUrl(listData), [listData]);
	const { data: tracks } = useSWR(trackIdsUrl, fetcher);
	const {
		setArtists,
		setDuration,
		setName,
		setUrl,
		setSongIds,
		setCurrI,
		currI,
	} = useContext(MusicContext);

	const audio = useAudio();

	useEffect(() => {
		if (tracks) {
			const song = tracks.songs[currI];
			const { name, al: album, ar: artists, dt: duration } = song;
			const albumPicUrl = album.picUrl;
			const artistName = artists[0].name;
			const dur = getDur(duration);
			setUrl(albumPicUrl);
			setName(name);
			setArtists(artistName);
			setDuration(dur);
            setSongIds(getSongIds(listData));
		}
	}, [currI]);

	return (
		<StyledDiv>
			{!listData && <CircularProgress />}
			{listData && (
				<div className="header">
					<StyledListPic
						width={12}
						height={12}
						bdr={0.5}
						src={listData.playlist.coverImgUrl}
					></StyledListPic>
					<div className="info">
						<h3>{listData.playlist.name}</h3>
						<div className="creator">
							<Avatar src={listData.playlist.creator.avatarUrl} />
							{listData.playlist.creator.nickname}
						</div>
					</div>
				</div>
			)}
			<StyledTable>
				{(!listData || !tracks) && <CircularProgress />}
				<TableHead className="table-head">
					<TableCell></TableCell>
					<TableCell>音乐标题</TableCell>
					<TableCell>歌手</TableCell>
					<TableCell>专辑</TableCell>
					<TableCell align="right" sx={{ paddingRight: "2rem" }}>
						时长
					</TableCell>
				</TableHead>
				<TableBody className="table-body">
					{listData &&
						tracks &&
						tracks.songs.map((song: any, index: number) => {
							const {
								name,
								al: album,
								ar: artists,
								dt: duration,
							} = song;
							const albumPicUrl = album.picUrl;
							const albumName = album.name;
							const artistName = artists[0].name;
							const dur = getDur(duration);
							const handleClick = () => {
								setArtists(artistName);
								setDuration(dur);
								setUrl(albumPicUrl);
								setName(name);
								setSongIds(getSongIds(listData));
								setCurrI(index);
								audio.pause();
							};
							return (
								<TableRow
									className="table-row"
									key={name}
									onClick={handleClick}
								>
									<TableCell className="i">
										{index + 1}
									</TableCell>
									<TableCell
										className={
											currI === index ? "r-name" : "name"
										}
									>
										{name}
									</TableCell>
									<TableCell className="artist">
										{artistName}
									</TableCell>
									<TableCell className="album">
										<div>{albumName}</div>
									</TableCell>
									<TableCell className="dur">{dur}</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</StyledTable>
		</StyledDiv>
	);
};
