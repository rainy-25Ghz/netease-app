import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../util/network";

const StyledContainer = styled.div`

    display: flex;
    width: 86rem;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    .item {
        display: flex;
        flex-direction: column;
        width: 16rem;
        height: 20rem;

        .link {
            text-decoration: none;
            text-align: left;
            color: black;
        }
    }
`;
interface ListPicProps {
    src?: string;
    width?: number;
    height?: number;
    bdr?:number;
    onClick?:()=>void;
}
export const StyledListPic = styled.div<ListPicProps>`
    width: ${(props) => (props.width ? `${props.width}rem` : "16rem")};
    height: ${(props) => (props.height ? `${props.height}rem` : "16rem")};
    border-radius:${(props) => (props.bdr ? `${props.bdr}rem` : "1rem")};
    background-image: url(${(props) => props.src?props.src:"/default.png"});
    background-size: contain;
    flex-shrink: 0;

`;
const defaultData = new Array(10).fill(null);
export const RecommendList = () => {
    const { data, error } = useSWR("/personalized?limit=10", fetcher);
    const history=useHistory();
    return (
        <StyledContainer>
            {data?.result
                ? data.result.map((item: any) => {
                      return (
                          <div className="item">
                              <StyledListPic src={item.picUrl} onClick={()=>{history&&history.push(`/list/${item.id}`)}} />
                              <Link className="link" to={`/list/${item.id}`}><span>{item.name}</span></Link>
                          </div>
                      );
                  })
                : defaultData.map(() => <CircularProgress />)}
        </StyledContainer>
    );
};
