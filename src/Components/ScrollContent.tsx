import React from "react";
import styled from "@emotion/styled";
import { useHistory, useLocation } from "react-router";
interface MainProps {
	hasTitle: boolean;
}
const StyledMain = styled.main<MainProps>`
	width: 100%;
	height: ${(props) =>
		props.hasTitle ? `calc(100vh - 6rem)` : `calc(100vh - 4rem)`};
	padding-top: ${(props) => (props.hasTitle ? `8rem` : `6rem`)};
`;
const StyledDiv = styled.div`
	max-width: calc(100vw - 256px);
	width: 100%;
	height: calc(100vh - 14rem);
	overflow-x: hidden;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	align-items: center;


`;
interface Props {
	children: React.ReactNode;
}
export const ScrollContent = ({ children }: Props) => {
	const location = useLocation();
	return (
		<StyledMain hasTitle={location.pathname.indexOf("findmusic") !== -1}>
			<StyledDiv>{children}</StyledDiv>
		</StyledMain>
	);
};
