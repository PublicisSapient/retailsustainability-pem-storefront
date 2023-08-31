import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardBadge from './cardBadge';
import { globalTheme as theme } from '@p2p-exchange/core';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import DefaultImage from '../assets/default-card-Image.svg';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  imageURL: string;
  productName: string;
  offerType: string;
  description: string;
  location: string;
  date: string;
  price: string;
  productID: string;
  cardDimentionConfig: {
    width: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    height: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
  };
}
const featuredCard = ({
  imageURL,
  productName,
  offerType,
  description,
  location,
  date,
  price,
  cardDimentionConfig,
  productID,
}: FeatureCardProps) => {
  const navigate = useNavigate();
  const getDetailsPage = () => {
    window.open(`/product/${productID}`, '_blank');
    // navigate(`/product/${productID}`);
  };
  return (
    <Card
      onClick={getDetailsPage}
      sx={{
        width: cardDimentionConfig?.width,
        boxShadow: 'none',
        margin: '0 auto',
        backgroundColor: theme.palette.background.default,
        cursor: 'pointer',
      }}
    >
      <CardMedia
        sx={{
          height: cardDimentionConfig?.height,
          backgroundColor: theme.palette.background.paper,
          ...(!imageURL && { backgroundSize: 'auto' }),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
        }}
        image={imageURL || DefaultImage}
        title={productName}
      >
        <CardBadge text={offerType} />
        {/* <IconButton aria-label="favourite" sx={{ p: 1.5 }}>
          <FavoriteBorderIcon />
        </IconButton> */}
      </CardMedia>
      <CardContent
        sx={{
          padding: '12px 0 0 0',
        }}
      >
        <Typography variant="h6" color="initial">
          {price}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {productName}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="caption"
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              width: '60%',
            }}
          >
            {location}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default featuredCard;
