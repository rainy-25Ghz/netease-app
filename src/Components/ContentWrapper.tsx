import React from "react";
import styled from "@emotion/styled";
const StyledDiv = styled.div`
	flex: 1 0 auto;
	height: 100vh;
	overflow-y: hidden;
	@media screen and (max-width: 600px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

export const ContentWrapper = StyledDiv;
