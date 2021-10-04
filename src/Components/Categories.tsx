import React, { Dispatch } from "react";
import useSWR from "swr";
import { fetcher } from "../util/network";

interface Props {
	currCat: string;
	setCurrCat: Dispatch<string>;
}
export const vidCats = [
	{
		id: 58100,
		name: "现场",
	},
	{
		id: 60100,
		name: "翻唱",
	},
	{
		id: 1101,
		name: "舞蹈",
	},
	{
		id: 58101,
		name: "听BGM",
	},
	{
		id: 2100,
		name: "生活",
	},
	{
		id: 2103,
		name: "游戏",
	},
	{
		id: 57104,
		name: "ACG音乐",
	},
	{
		id: 1105,
		name: "最佳饭制",
	},
];
export const VidCategories = ({currCat, setCurrCat}: Props) => {
    return (
		<div className="status">
			<div className="wrapper">
				<div className="curr-cat">
					<span>{currCat}</span>
				</div>
			</div>
			{vidCats.slice(0, 10).map((item) => (
				<div
					key={item.name}
					className={`cat-name ${
						item.name === currCat ? "selected" : ""
					}`}
					onClick={() => {
						setCurrCat(item.name);
					}}
				>
					{item.name}
				</div>
			))}
		</div>
	);
};
export const Categories = ({ currCat, setCurrCat }: Props) => {
	const { data: cats } = useSWR("/playlist/catlist", fetcher);
	return (
		<div className="status">
			<div className="wrapper">
				<div className="curr-cat">
					<span>{currCat}</span>
				</div>
			</div>
			{cats?.sub.slice(0, 10).map((item: any) => (
				<div
					key={item.name}
					className={`cat-name ${
						item.name === currCat ? "selected" : ""
					}`}
					onClick={() => {
						setCurrCat(item.name);
					}}
				>
					{item.name}
				</div>
			))}
		</div>
	);
};
