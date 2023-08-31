import { Box } from '@mui/material';
import {
  AppDispatch,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '@p2p-exchange/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const productDetailWrapper = () => {
  const dispatch = useAppDispatch();
  //   const giveAway = useSelector<RootState>((state) => state.giveAway);
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        background: '#F5F5F5',
      }}
    >
      <h1>Hello</h1>
    </Box>
  );
};

export default productDetailWrapper;
