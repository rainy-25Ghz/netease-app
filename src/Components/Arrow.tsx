import styled from "@emotion/styled";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
interface Props {}

export const StyledArrowLeft = styled(ArrowBackIosIcon)`
    transform: translateX(64px);
    z-index:3000; 
`;
export const StyledArrowRight = styled(ArrowForwardIosIcon)`
    transform: translateX(-64px);
`;
