import styled from "@emotion/styled";
import { ArrowForwardIos, ArrowRight } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { Link, useHistory } from "react-router-dom";
const StyledTypo = styled.span`

	font-size: 24px;
	width: 86rem;
	margin-top: 1rem;
	margin-bottom: 0.5rem;
	font-weight: 600;
	vertical-align: middle;
	display: inline-block;
	text-align: left;
	.icon {
		vertical-align: middle;
		display: inline-block;
	}
	user-select: none; /* Standard */
	& span:hover {
		cursor: pointer;
	}
`;
interface Props {
	children: ReactNode;
	to?: string;
}

export const Title = (props: Props) => {
	const history = useHistory();
	return (
		<StyledTypo
			onClick={() => {
				props.to && history.push(props.to);
			}}
		>
			<span>{props.children}</span>
			<span className="icon">
				<ArrowForwardIos />
			</span>
		</StyledTypo>
	);
};
