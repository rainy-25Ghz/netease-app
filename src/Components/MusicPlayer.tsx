import styled from '@emotion/styled';
import React from 'react'
import { StyledListPic } from './RecommendList';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  .info{
      display: flex;
      text-align:left;
      .author{

      }
  }
`;
interface Props {
    
}

export const MusicPlayer = (props: Props) => {
    return (
        <Layout>
            <div className="info">
        
            </div>
        </Layout>
    )
}
