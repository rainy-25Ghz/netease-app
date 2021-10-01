import Slider, { Settings } from "react-slick";
import React from "react";
import styled from "@emotion/styled";
import { useBanner } from "../hooks/useBanner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CircularProgress } from "@mui/material";
const StyledDiv = styled.div`
	height: 16rem;
	width: 43rem;
	border-radius: 1rem;
	&:hover {
		.slick-prev,.slick-next{
            color:white;
        }
	}
	
`;
const StyledSlider = styled(Slider)``;
interface ContainerProps {
	img: string;
}
const StyledContainer = styled.div<ContainerProps>`
	width: 43rem;
	height: 16rem;
	border-radius: 1rem;
	background-size: contain;
	background-image: url(${(props) => props.img});
`;

interface Props {
	imgs?: string[];
}

export const Carousel = (props: Settings & Props) => {
	const { bannerData } = useBanner();
	return (
		<StyledDiv>
			{bannerData ? (
				<StyledSlider {...props}>
					{bannerData.banners.map((img: any) => {
						console.log(img);
						return (
							<StyledContainer
								key={img.imageUrl}
								img={img.imageUrl}
							></StyledContainer>
						);
					})}
				</StyledSlider>
			) : (
				<CircularProgress />
			)}
		</StyledDiv>
	);
};
