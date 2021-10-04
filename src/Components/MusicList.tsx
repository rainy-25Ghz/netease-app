import styled from "@emotion/styled";
import { List } from "@mui/material";
import React from "react";
import { useParams } from "react-router";

const StyledList = styled(List)`
	color: black;
`;

export const MusicList = () => {
    const {id}=useParams<any>();
	return <StyledList>{id}</StyledList>;
};
