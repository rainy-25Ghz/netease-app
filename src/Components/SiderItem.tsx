import React from "react";
import styled from "styled-components";
const StyledDiv = styled.div<Props>`
  background-color: ${(props) =>
    props.activated ? "rgb(246,246,247)" : "white"};
  &:hover {
    background-color: rgb(246,246,247); 
    cursor: pointer;
  }
  font-weight: ${(props)=>props.activated?"1000":"500"};
  border-radius: 8px;
  height: 2rem;
  border-bottom: 4px solid white;
  display: flex;
  align-items: center;
  padding-left:8px ;

`;
interface Props {
  activated?: boolean;
}

export const SiderItem = StyledDiv ;
