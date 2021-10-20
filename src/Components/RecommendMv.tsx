import React from "react";
import useSWR from "swr";
import { fetcher } from "../util/network";
import styled from "@emotion/styled";
import { StyledListPic } from "./RecommendList";
import { CircularProgress } from "@mui/material";

const StyeldDiv = styled.div`

    display: flex;
    width: 86rem;
    height: 17rem;
    justify-content: space-between;
    .mv {
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 20rem;
        span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .artists {
            color: #666565b9;
        }
    }
`;

export const RecommendMv = () => {
    const { data } = useSWR("/personalized/mv", fetcher);
    return (
        <StyeldDiv>
            {data
                ? data.result.map((item: any) => {
                      return (
                          <div className="mv">
                              <StyledListPic
                                  src={item.picUrl}
                                  width={20}
                                  height={11}
                              />
                              <span className="name">{item.name}</span>
                              <span className="artists">
                                  {item.artists
                                      .map((artist: any) => artist.name)
                                      .join("/")}
                              </span>
                          </div>
                      );
                  })
                : new Array(4).fill(null).map(() => (
                      <div className="mv">
                          <CircularProgress />
                      </div>
                  ))}
        </StyeldDiv>
    );
};
