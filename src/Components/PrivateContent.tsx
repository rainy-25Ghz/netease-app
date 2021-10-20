import React from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import { fetcher } from "../util/network";
import { StyledListPic } from "./RecommendList";
import { CircularProgress } from "@mui/material";
interface Props {}
const StyledDiv = styled.div`

    display: flex;
    width: 86rem;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
        display: flex;
        flex-direction: column;
        width: 28rem;
        height: 18rem;
        span {
            text-align: left;
        }
    }
`;
const defaultData = new Array(3).fill(null);
export const PrivateContent = (props: Props) => {
    const { data, error } = useSWR("/personalized/privatecontent", fetcher);

    return (
        <StyledDiv>
            {data?.result
                ? data.result.map((item: any) => {
                      return (
                          <div className="item">
                              <StyledListPic src={item.sPicUrl} width={28} height={15}></StyledListPic>
                              <span>{item.name}</span>
                          </div>
                      );
                  })
                : defaultData.map(() => <CircularProgress />)}
        </StyledDiv>
    );
};
