import { Box, Card, CardContent, createStyles, Grid, IconButton, LinearProgress, Typography, withStyles,
} from '@mui/material';
import { styled } from '@mui/material';
import React from 'react';
import {
  deleteImage,
  unLinkImage,
  useAppDispatch,
} from '@p2p-exchange/core';
import { Close } from '@mui/icons-material';

export interface ImageListProps {
  image: string;
}

export function ImageList({ image }: ImageListProps) {
  const dispatch = useAppDispatch();

  const onDelete = () => {
    if (image) {
      dispatch(unLinkImage(image));
    }
  };

  return (
    <React.Fragment>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Grid container alignItems="start" justifyContent="flex-end">
            <Box alignItems="center">
              <IconButton
                size="large"
                onClick={() => {onDelete()}} 
                aria-label="Example"
              >
                <Close fontSize="medium" />
              </IconButton>
            </Box>
          </Grid>
          <img width="100%" src={image} title="product" />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
