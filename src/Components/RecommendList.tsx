import styled from '@emotion/styled'
import React from 'react'
import useSWR from 'swr';
import { fetcher } from '../util/network';
const StyledContainer=styled.div`
display: flex;
width: 86rem;
flex-wrap: wrap;
justify-content: space-between;
align-content: space-between;
`
interface ItemProps{
    src:string;
}
const StyledItem=styled.div<ItemProps>`
width: 13rem;
height:13rem;
border-radius: 1rem;
background-image: url(${props=>props.src});
`
const defaultData=new Array(10).fill(null);
export const RecommendList =()=>{
    const {data,error}=useSWR("/personalized?limit=10",fetcher);
    return <StyledContainer>
        {
            data?.result?data.result.map((item:any)=>{
                return <StyledItem src={item.picUrl}/>
            }):
        }
    </StyledContainer>
};