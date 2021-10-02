import React, { Dispatch } from "react";
import useSWR from "swr";
import { fetcher } from "../util/network";

interface Props {
	currCat: string;
	setCurrCat: Dispatch<string>;
}

export const Categories = ({currCat,setCurrCat}: Props) => {
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
