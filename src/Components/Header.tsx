import React from "react";
import styled from "styled-components";

const StyledHead = styled.head`
  display: flex;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  height: 4rem;
  border-style: solid;
  border-width: 0px;
  border-bottom-width: 1px;
  border-color: rgba(237, 242, 247, 1);
  background-color: rgb(236, 65, 65);
`;

interface Props {}

export const Header = (props: Props) => {
  return (
    <StyledHead>
        <img src="/logo_netease.png" alt={""}/>
      <p>netease</p>
    </StyledHead>
  );
};
