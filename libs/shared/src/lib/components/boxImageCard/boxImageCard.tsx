import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardBadge from './cardBadge';
import { globalTheme as theme } from '@p2p-exchange/core';
import { useMediaQuery } from '@mui/material';
import DefaultImage from '../assets/default-card-Image.svg';
import { useNavigate } from 'react-router-dom';

type BoxCardProps = {
  imageURL: string;
  productName: string;
  offerType: string;
  productID: string;
};
const boxImageCard = ({
  imageURL,
  productName,
  offerType,
  productID,
}: BoxCardProps) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const getDetailsPage = () => {
    navigate(`/product/${productID}`);
  };
  return (
    <Card
      onClick={getDetailsPage}
      sx={{
        width: { xs: 140, sm: 140, md: 192, lg: 240, xl: 270 },
        boxShadow: 'none',
        margin: '0 auto',
        backgroundColor: theme.palette.background.default,
        cursor: 'pointer',
      }}
    >
      <CardMedia
        sx={{
          height: { xs: 175, sm: 175, md: 240, lg: 240, xl: 337.5 },
          backgroundColor: theme.palette.background.paper,
          ...(!imageURL && { backgroundSize: 'auto' }),
        }}
        image={imageURL || DefaultImage}
        title={productName}
      >
        <CardBadge text={offerType} />
      </CardMedia>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '12px',
        }}
      >
        <Typography
          variant={isSmallScreen ? 'body2' : 'h6'}
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {productName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default boxImageCard;
