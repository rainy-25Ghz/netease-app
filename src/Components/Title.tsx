import styled from "@emotion/styled";
import { ArrowForwardIos, ArrowRight } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
const StyledTypo = styled.span`
    font-size: 24px;
    width: 86rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    vertical-align: middle;
    display: inline-block;
    text-align: left;
    .icon {
        vertical-align: middle;
        display: inline-block;
    }
`;
interface Props {
    children: ReactNode;
}

export const Title = (props: Props) => {
    return (
        <StyledTypo>
            <span>{props.children}</span>
            <span className="icon">
                <ArrowForwardIos />
            </span>
        </StyledTypo>
    );
};
