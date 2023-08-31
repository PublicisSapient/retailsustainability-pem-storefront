import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
import { globalTheme as theme } from '@p2p-exchange/core';
import { PageTitle } from '@p2p-exchange/shared';
const MarqueeContainer = styled(Box)(({ theme }) => {
  const isTabletScreen = useMediaQuery('(max-width:899px)');
  const isDesktopScreen = useMediaQuery('(max-width:1536px)');
  return {
    display: 'flex',
    gap: isTabletScreen ? '12px' : '24px',
    margin: '24px 0',
    animation: 'marqueeAnimation 20s linear infinite',
    '@keyframes marqueeAnimation': {
      '0%': {
        transform: 'translateX(0)',
      },
      '100%': {
        transform: `translateX(${
          isTabletScreen ? '-608px' : isDesktopScreen ? '-864px' : '-1176px'
        })`,
      },
    },
  };
});
const donationLandingPage = () => {
  const isTabletScreen = useMediaQuery('(max-width:899px)');
  const navigate = useNavigate();
  const commonUrl =
    'https://storage.googleapis.com/p2p-product-images-dev/homebanner/';

  const imageMapper: { [key: string]: string } = {
    Bag: commonUrl + 'Bag.jpg',
    Shoe: commonUrl + 'Shoe.jpg',
    EPA: commonUrl + 'EPA.jpg',
    SUSTAINABLEYEG: commonUrl + 'SUSTAINABLEYEG.jpg',
    ACRE: commonUrl + 'acre.jpg',
    GSPN: commonUrl + 'GSPN.jpg',
    Banner: commonUrl + 'Impact-banner.jpg',
  };
  const organizations = [
    { name: 'Eco Panel Agency', image: imageMapper.EPA },
    { name: 'SustainableYEG', image: imageMapper.SUSTAINABLEYEG },
    { name: 'ACRE', image: imageMapper.ACRE },
    { name: 'GSPN Solutions', image: imageMapper.GSPN },
  ];
  return (
    <>
      <PageTitle title={'Sustainability Impact'} />
      <Box
        sx={{
          height: {
            xs: '302px',
            sm: '281px',
            md: '420px',
            lg: '540px',
          },
          backgroundImage: `linear-gradient(0deg, rgba(46, 125, 50, 0.70) 0%, rgba(46, 125, 50, 0.70) 100%), url(${imageMapper.Banner})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100.231% 100%',
          display: 'flex',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: { xs: '100%', sm: '564px' },
          }}
        >
          <Typography variant="overline" color="#FFF">
            Save earth
          </Typography>
          <Typography
            variant={isTabletScreen ? 'h4' : 'h3'}
            color="#FFF"
            sx={{ mt: 2, mb: 1 }}
          >
            Sustainable Impact
          </Typography>
          <Typography variant="h6" color="#FFF" textAlign={'center'}>
            Making conscious decisions to make sure, we are taking good care of
            the place we all call home.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 6,
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '1200px',
          overflow: 'hidden',
          width: '100%',
          px: 3,
          mx: 'auto',
          mt: 6,
          mb: 12,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 3, md: 6 },
            flexDirection: { xs: 'column', md: 'row' },
            backgroundColor: '#FAFAFA',
          }}
        >
          <Box
            component="img"
            sx={{
              height: { xs: '96vw', md: '390px', lg: '520px', xl: '537.8px' },
            }}
            alt="Handbag"
            src={imageMapper.Bag}
          />
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 2,
              mx: { sm: 3 },
            }}
          >
            <Typography variant="overline" color="initial" textAlign="center">
              Analytical Report
            </Typography>
            <Typography
              variant={isTabletScreen ? 'h5' : 'h4'}
              color="initial"
              textAlign="center"
            >
              We are proud of our Impact
            </Typography>
            <Typography variant="body1" color="initial" textAlign="center">
              Each year, we document where we are in our journey, from the point
              where we started. We analyze the data to see how well we’re
              performing with our commitments. And you can count on us to be
              transparent—even when there’s still room for improvement.
            </Typography>
            {/* <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
              endIcon={<ArrowDownwardIcon />}
            >
              Download the Impact report
            </Button> */}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              maxWidth: '720px',
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              flexDirection: 'column',
              mx: 'auto',
            }}
          >
            <Typography variant="h4" color="initial">
              Sustainability Experts
            </Typography>
            <Typography variant="body1" color="initial" textAlign={'center'}>
              Some things are best left to the experts. So, we've partnered with
              best-in-class organizations that have set a high standard for
              ethical and environmental responsibility
            </Typography>
          </Box>
          <Box
            sx={{
              overflow: 'hidden',
              width: { xs: '596px', md: '840px', xl: '1152px' },
              mx: 'auto',
            }}
          >
            <MarqueeContainer>
              {organizations.map(
                (ele: { name: string; image: string }, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.5,
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        height: { xs: '140px', md: '192px', xl: '270px' },
                        width: { xs: '140px', md: '192px', xl: '270px' },
                        backgroundImage: `url(${ele.image})`,
                        backgroundColor: '#FAFAFA',
                        backgroundSize: 'cover',
                      }}
                    ></Box>
                    <Typography
                      variant={isTabletScreen ? 'body1' : 'h6'}
                      color="initial"
                      sx={{ mx: 'auto' }}
                    >
                      {ele.name}
                    </Typography>
                  </Box>
                )
              )}
              {/* Added Dublicate image for the marquee effect */}
              {organizations.map(
                (ele: { name: string; image: string }, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.5,
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        height: { xs: '140px', md: '192px', xl: '270px' },
                        width: { xs: '140px', md: '192px', xl: '270px' },
                        backgroundImage: `url(${ele.image})`,
                        backgroundColor: '#FAFAFA',
                        backgroundSize: 'cover',
                      }}
                    ></Box>
                    <Typography
                      variant={isTabletScreen ? 'body1' : 'h6'}
                      color="initial"
                      sx={{ mx: 'auto' }}
                    >
                      {ele.name}
                    </Typography>
                  </Box>
                )
              )}
            </MarqueeContainer>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 3, md: 6 },
            flexDirection: { xs: 'column', md: 'row' },
            backgroundColor: '#FAFAFA',
          }}
        >
          <Box
            component="img"
            sx={{
              height: { xs: '96vw', md: '390px', lg: '520px', xl: '537.8px' },
            }}
            alt="Handbag"
            src={imageMapper.Shoe}
          />
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 2,
              mx: { sm: 3 },
            }}
          >
            <Typography variant="overline" color="initial" textAlign="center">
              Sharing Pre-Loved
            </Typography>
            <Typography
              variant={isTabletScreen ? 'h5' : 'h4'}
              color="initial"
              textAlign="center"
            >
              Do good. Feel good. (re)WEAR GOOD.
            </Typography>
            <Typography variant="body1" color="initial" textAlign="center">
              We collaborated with our partners to extend the life of clothing
              and footwear. Donate your gently used items in exchange for
              TCP.com credits and promotional offers. Easier on the wallet, and
              the planet.
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              startIcon={<CardGiftcardIcon />}
              endIcon={<ChevronRightIcon />}
              onClick={() => navigate('/donate-item')}
            >
              donate your Pre-Loved Items
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default donationLandingPage;
