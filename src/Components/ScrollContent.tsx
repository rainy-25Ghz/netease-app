import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  width: 100%;
  height: calc(100vh - 6rem);
  padding-top: 8rem;
  
`;
const StyledDiv = styled.div`
  max-width: calc(100vw - 256px);
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    border-radius: 4px;
    background-color: #6b6b6b2f;
  }
`;
interface Props {
  children: React.ReactNode;
}
export const ScrollContent = ({ children }: Props) => (
  <StyledMain>
    <StyledDiv>{children}</StyledDiv>
  </StyledMain>
);
