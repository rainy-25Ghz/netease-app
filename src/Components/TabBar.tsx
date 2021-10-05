import styled from "@emotion/styled";
const StyledHead = styled.header`
	@media screen and (max-width: 600px) {
		left: 0px;
    justify-content: center;
	}
	display: flex;
	position: fixed;
	top: 4rem;
	width: 100%;
	left: 256px;
	height: 4rem;
	background-color: rgb(255, 255, 255);
	align-items: center;
`;

export const TabBar = StyledHead;
