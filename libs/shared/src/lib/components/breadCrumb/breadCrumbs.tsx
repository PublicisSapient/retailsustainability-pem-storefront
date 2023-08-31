import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Link, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
type DataItem = { buttonText: string; buttonUrl: string };
type BreadCrumbProps = {
  data: DataItem[];
};

const breadCrumbs = ({ data }: BreadCrumbProps) => {
  const navigate = useNavigate();
  const handleNavigation = (url: string) => () => {
    navigate(url);
  };
  return (
    <Box sx={{ width: '100%', mb: 3, display: 'flex' }}>
      {data.map((ele: DataItem, index: number) => (
        <>
          <Link
            component="button"
            key={index}
            onClick={handleNavigation(ele.buttonUrl)}
            variant="body2"
            color="inherit"
            underline="none"
          >
            {ele.buttonText}
          </Link>
          {index !== data.length - 1 && (
            <Typography variant="body2" color="initial" sx={{ mx: 1 }}>
              /
            </Typography>
          )}
        </>
      ))}
    </Box>
  );
};

export default breadCrumbs;
