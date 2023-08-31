import React from 'react';
import Slider from 'react-slick';
import './style.css';
import { NextArrow, PrevArrow } from './carrouselArrows';
import { Box } from '@mui/material';
import CarrouselDots from './carrouselDots';
import { breakpointMapper, getSlidesToShow } from './carouselConstants';

type CarouselProps = {
  children: React.ReactNode;
  itemLength: number;
  slidesToDisplay: number;
  isPdp?: boolean;
};
const CardCarousel = ({
  children,
  itemLength,
  slidesToDisplay,
  isPdp,
}: CarouselProps) => {
  const [hovered, setHovered] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [slidesToView, setSlidesToView] = React.useState(slidesToDisplay);
  React.useEffect(() => {
    let slidesCount = getSlidesToShow(slidesToDisplay, window.innerWidth);
    setSlidesToView(slidesCount);
  }, [window.innerWidth]);

  const handleChange = (currentSlide: number, nextSlide: number) => {
    setActiveSlide(nextSlide);
  };

  const settings = {
    infinite: false,
    speed: 500,
    className: isPdp ? 'cardCarousel-pdp' : 'cardCarousel',
    slidesToShow: slidesToDisplay,
    slidesToScroll: slidesToDisplay,
    nextArrow: <NextArrow hovered={hovered} />,
    prevArrow: <PrevArrow hovered={hovered} />,
    beforeChange: handleChange,
    responsive: breakpointMapper[slidesToDisplay],
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Slider {...settings}>{children}</Slider>
        <CarrouselDots
          stepsCount={itemLength / slidesToView}
          activeStep={activeSlide / slidesToView}
        />
      </Box>
    </>
  );
};

export default CardCarousel;
