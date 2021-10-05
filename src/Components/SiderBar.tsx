import React from "react";
import styled from "@emotion/styled";
const StyledAside = styled.aside`
	@media screen and (max-width: 600px) {
		display: none;
	}
	top: 4rem;
	height: calc(100vh - 4rem - 6rem);
	position: fixed;
	width: 256px;
	z-index: 1000;
`;
const StyledDiv = styled.div`
	@media screen and (max-width: 600px) {
		display: none;
		&::-webkit-scrollbar {
			width: initial;
			background-color: initial;
		}
		&::-webkit-scrollbar-thumb {
			width: initial;
			border-radius: initial;
			background-color: initial;
		}
	}
	border-color: rgba(237, 242, 247, 1);
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 1rem;
	padding-right: 2px;
	border-right-width: 1px;
	border-right-style: solid;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 10px;
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		width: 10px;
		border-radius: 4px;
		background-color: #80808022;
	}
`;

interface Props {
	children: React.ReactNode;
}

export const SiderBar = (props: Props) => {
	return (
		<StyledAside>
			<StyledDiv>{props.children}</StyledDiv>
		</StyledAside>
	);
};
