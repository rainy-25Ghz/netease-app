import Slider, { Settings } from "react-slick";
import React from "react";
import styled from "@emotion/styled";
import { useBanner } from "../hooks/useBanner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const StyledDiv = styled.div`
    height: 250px;
    width:250px;
`;
const StyledSlider = styled(Slider)`
`;
interface Props {
    imgs?: string[];
}

export const Carousel = (props: Settings & Props) => {
    const { bannerData } = useBanner();
    return (
        <StyledDiv>
            <StyledSlider {...props}>
                <div style={{backgroundColor:"black"}}>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </StyledSlider>
        </StyledDiv>
    );
};
