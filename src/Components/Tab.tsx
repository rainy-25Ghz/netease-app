import React from "react";
import styled from "styled-components";
const StyledDiv = styled.div<Partial<Props>>`
  font-size: ${(props) => (props.activated ? "22px" : "18px")};
  font-weight: ${(props) => (props.activated ? "600" : "")};
  margin-left: 2rem;
`;
interface Props {
  title: string;
  activated?: boolean;
}

export const Tab = ({ title, activated = false }: Props) => {
  return <StyledDiv activated={activated}>{title}</StyledDiv>;
};