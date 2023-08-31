export const breakpointMapper: any = {
  6: [
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: false,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 5.4,
        slidesToScroll: 5.4,
        arrows: false,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 6.3,
        slidesToScroll: 6.3,
        arrows: false,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 5.5,
        slidesToScroll: 5.5,
        arrows: false,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 5.4,
        slidesToScroll: 5.4,
        arrows: false,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 4.8,
        slidesToScroll: 4.8,
        arrows: false,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 4.5,
        slidesToScroll: 4.5,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4.8,
        slidesToScroll: 4.8,
        arrows: false,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 4.3,
        slidesToScroll: 4.3,
        arrows: false,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 3.8,
        slidesToScroll: 3.8,
        arrows: false,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 3.3,
        slidesToScroll: 3.3,
        arrows: false,
      },
    },
  ],
  4: [
    {
      breakpoint: 1250,
      settings: {
        arrows: false,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 4.8,
        slidesToScroll: 4.8,
        arrows: false,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 4.5,
        slidesToScroll: 4.5,
        arrows: false,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 4.2,
        slidesToScroll: 4.2,
        arrows: false,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5.3,
        slidesToScroll: 5.3,
        arrows: false,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 4.7,
        slidesToScroll: 4.7,
        arrows: false,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 4.3,
        slidesToScroll: 4.3,
        arrows: false,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 3.5,
        arrows: false,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 3.2,
        slidesToScroll: 3.2,
        arrows: false,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
      },
    },
    {
      breakpoint: 460,
      settings: {
        slidesToShow: 2.8,
        slidesToScroll: 2.8,
        arrows: false,
      },
    },
    {
      breakpoint: 430,
      settings: {
        slidesToShow: 2.7,
        slidesToScroll: 2.7,
        arrows: false,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 2.5,
        arrows: false,
      },
    },
  ],
  3: [
    {
      breakpoint: 1200,
      settings: {
        arrows: false,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2.1,
        slidesToScroll: 2.1,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.3,
        slidesToScroll: 1.3,
        arrows: false,
      },
    },
  ],
  2: [
    {
      breakpoint: 1200,
      settings: {
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
  1: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

export function getSlidesToShow(
  slidesToDisplay: number,
  currentScreenWidth: number
): number {
  const breakpointSettings = breakpointMapper[slidesToDisplay];
  for (let i = breakpointSettings.length - 1; i > 0; i--) {
    const { breakpoint, settings } = breakpointSettings[i];
    if (currentScreenWidth < breakpoint) {
      return settings.slidesToShow;
    }
  }

  return slidesToDisplay;
}
