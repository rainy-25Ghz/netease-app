import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: fixed;
  bottom: 0;
  height: 6rem;
  width: 100vw;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: rgba(237, 242, 247, 1);
  z-index: 1200;
  background-color: white;
`;

interface Props {
  children: React.ReactNode;
}

export const Footer = (props: Props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};
