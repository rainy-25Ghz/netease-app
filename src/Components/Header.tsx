import React from "react";
import styled from "styled-components";

const StyledHead = styled.header`
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
  .logo {
    width: 256px;
  }
`;

export const Header = StyledHead;
export const HeaderContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
