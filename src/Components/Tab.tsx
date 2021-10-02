import React from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const StyledDiv = styled.div<Partial<Props>>`
	font-size: ${(props) => (props.activated ? "22px" : "18px")};
	font-weight: ${(props) => (props.activated ? "600" : "")};
	margin-left: 2rem;
	border-bottom: ${(props) =>
		props.activated ? "solid 2px rgb(236, 65, 65) " : ""};
	&:hover {
		cursor: pointer;
	}
	.tab-link {
    color:black;
    text-decoration: none;
  }
`;
interface Props {
	title: string;
	activated?: boolean;
	onClick?: () => void;
	path: string;
}

export const Tab = ({ title, activated = false, onClick, path }: Props) => {
	return (
		<StyledDiv activated={activated} onClick={onClick}>
			<Link className="tab-link" to={path}>
				{title}
			</Link>
		</StyledDiv>
	);
};
