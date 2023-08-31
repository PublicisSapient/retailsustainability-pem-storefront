import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { globalTheme as theme } from '@p2p-exchange/core';
import DefaultImage from '../assets/default-card-Image.svg';
import { useNavigate } from 'react-router-dom';

type RoundCardProps = {
  imageURL: string;
  productName: string;
  productID: string;
};
const RoundImageCard = ({
  imageURL,
  productName,
  productID,
}: RoundCardProps) => {
  const navigate = useNavigate();
  const getDetailsPage = () => {
    navigate(`/product/${productID}`);
  };
  return (
    <Card
      onClick={getDetailsPage}
      sx={{
        width: { xs: 100, sm: 120, md: 150, lg: 150, xl: 172 },
        boxShadow: 'none',
        margin: '0 auto',
        background: theme.palette.background.default,
        cursor: 'pointer',
      }}
    >
      <CardMedia
        sx={{
          minHeight: { xs: 100, sm: 120, md: 150, lg: 150, xl: 172 },
          borderRadius: '50%',
          ...(!imageURL && { backgroundSize: 'auto' }),
        }}
        image={imageURL || DefaultImage}
        title={productName}
      />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '12px',
        }}
      >
        <Typography
          variant="body1"
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

export default RoundImageCard;
