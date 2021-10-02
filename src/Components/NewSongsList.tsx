import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../util/network";
const StyledDiv = styled.div`
    width: 86rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-between;
    .item {
        width: 27rem;
        height: 4rem;
        margin-bottom: 1rem;
        display: flex;
        .intro {
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            text-align: left;
            justify-content: center;

            .author {
                color: #666565b9;
            }
        }
    }
`;
interface ImgProps {
    src: string;
}
const StyledImg = styled.div<ImgProps>`
    border-radius: 1rem;
    width: 4rem;
    height: 4rem;
    background-image: url(${(props) => props.src});
`;

export const NewSongsList = () => {
    const { data, error } = useSWR("/personalized/newsong?limit=12", fetcher);
    return (
        <StyledDiv>
            {data
                ? data.result.map((item: any) => {
                      return (
                          <div className="item">
                              <StyledImg src={item.picUrl}></StyledImg>
                              <div className="intro">
                                  <span className="name">{item.name}</span>
                                  <span className="author">
                                      {item.song.artists
                                          .map((artist: any) => artist.name)
                                          .join("/")}
                                  </span>
                              </div>
                          </div>
                      );
                  })
                : new Array(12).fill(null).map(() => <CircularProgress />)}
        </StyledDiv>
    );
};
