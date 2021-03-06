import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "@emotion/styled";
const StyledDiv = styled.div<Props>`
	background-color: ${(props) =>
		props.activated ? "rgb(246,246,247)" : "white"};
	&:hover {
		background-color: rgb(246, 246, 247);
		cursor: pointer;
	}
	font-weight: ${(props) => (props.activated ? "1000" : "500")};
	border-radius: 8px;
	height: 2rem;
	border-bottom: 4px solid white;
	display: flex;
	align-items: center;
	padding-left: 8px;
	padding-right: 8px;
`;
const StyledLink = styled(Link)`
	color: #000000df;
	text-decoration: none;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;
interface Props {
	activated?: boolean;
	path: string;
	text: string;
	onClick?: () => void;
}

export const SiderLink = ({ text, path, activated, onClick }: Props) => {
	let history = useHistory();
	const handleClick = () => {
		history.push(path);
		onClick && onClick();
	};
	return (
		<StyledDiv {...{ text, path, activated }} onClick={handleClick}>
			<StyledLink to={path}>{text}</StyledLink>
		</StyledDiv>
	);
};
