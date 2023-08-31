import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ImageURL {
  [key: string]: string;
}

const MarqueeContainer = styled(Box)((props) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '64px',
  animation: 'marqueeAnimation 20s linear infinite',
  '& > img': {
    filter: 'grayscale(100%)',
  },
  '@keyframes marqueeAnimation': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-1104px)',
    },
  },
}));
const donationBanner = () => {
  const isTabletScreen = useMediaQuery('(max-width:899px)');
  const navigate = useNavigate();
  const URL =
    'https://storage.googleapis.com/p2p-product-images-dev/homebanner/';
  const imageURL: ImageURL = {
    Handbag: `${URL}handbag.jpg`,
    childrenPlace: `${URL}The-Children-Place.jpg`,
    Target: `${URL}Target.jpg`,
    NIKE: `${URL}NIKE.jpg`,
    Goodyear: `${URL}Goodyear.jpg`,
    PUMA: `${URL}Puma.jpg`,
    toryBurch: `${URL}Tory-Burch.jpg`,
  };
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        px: { md: 3, sm: 2, xs: 1.5 },
        mx: 'auto',
        width: '100%',
        mb: 12,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 3, md: 6 },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          component="img"
          sx={{
            backgroundColor: 'red',
            height: { xs: '96vw', md: '390px', lg: '520px', xl: '537.8px' },
          }}
          alt="Handbag"
          src={imageURL.Handbag}
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
            SUSTAINABILITY IMPACT
          </Typography>
          <Typography
            variant={isTabletScreen ? 'h5' : 'h4'}
            color="initial"
            textAlign="center"
          >
            Our Impact Initiative for Sustainable Trade
          </Typography>
          <Typography variant="body1" color="initial" textAlign="center">
            Building marketplace ecosystems enabled by tech, powered by trust,
            and loved by our customers. We all share the responsibility for our
            playground - planet earth. That’s why we’re reimagining things top
            to bottom through sustainability and circularity.{' '}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            endIcon={<ChevronRightIcon />}
          >
            View More
          </Button>
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
      <Box
        sx={{
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1040px',
          overflow: 'hidden',
          mt: 3,
        }}
      >
        <Typography variant="overline" color="initial" textAlign={'center'}>
          OUR TRUSTED PARTNERS
        </Typography>

        <MarqueeContainer>
          <Box
            component="img"
            alt="The Children Place"
            src={imageURL.childrenPlace}
          />
          <Box component="img" alt="Target" src={imageURL.Target} />
          <Box component="img" alt="NIKE" src={imageURL.NIKE} />
          <Box component="img" alt="Goodyear" src={imageURL.Goodyear} />
          <Box component="img" alt="PUMA" src={imageURL.PUMA} />
          <Box component="img" alt="Tory Burch" src={imageURL.toryBurch} />
          {/* Added Dublicate image for the marquee effect */}
          <Box
            component="img"
            alt="The Children Place"
            src={imageURL.childrenPlace}
          />
          <Box component="img" alt="Target" src={imageURL.Target} />
          <Box component="img" alt="NIKE" src={imageURL.NIKE} />
          <Box component="img" alt="Goodyear" src={imageURL.Goodyear} />
          <Box component="img" alt="PUMA" src={imageURL.PUMA} />
          <Box component="img" alt="Tory Burch" src={imageURL.toryBurch} />
        </MarqueeContainer>
      </Box>
    </Box>
  );
};

export default donationBanner;
