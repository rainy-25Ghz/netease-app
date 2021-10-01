import styled from "@emotion/styled";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
interface Props {}

export const StyledArrowLeft = styled(ArrowBackIosIcon)`
    color: white;
    transform: translateX(64px);
    z-index:3000;
    &&:hover{
        color: white;
    }
    
`;
export const StyledArrowRight = styled(ArrowForwardIosIcon)`
    color: white;
    transform: translateX(-64px);
    &&:hover{
        color: white;
    }
`;
