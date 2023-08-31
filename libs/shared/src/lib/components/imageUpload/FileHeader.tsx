import styles from './imageUpload.module.scss';
import { Box, Button, Grid, IconButton, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { Close, Delete } from '@mui/icons-material';
import { UploadableFile, deleteImage, deleteItemImage, useAppDispatch, useAppSelector } from '@p2p-exchange/core';

export interface FileHeaderProps {
  fileData: UploadableFile;
}

export function FileHeader({fileData }: FileHeaderProps) {
  const {file} = fileData;
  const dispatch = useAppDispatch();
  
  const ErrorMessages = function() {
    return <Box className={styles.imageError} flexGrow={1} >
        <Typography variant="subtitle1"> {file?.name}</Typography>
        {fileData?.errors.map((error:any) => (
         <Grid item key={error.code}>
          <Typography variant="subtitle2" color="error">{error.message}</Typography>
        </Grid>
        ))}
        <Grid item xs={12} sm={8} md={7} sx={{mb:3}}>
        <LinearProgress color="error" variant="determinate" value={0} />
        </Grid>
      </Box>
  }

  const SuccessMessages = function() {
    const fileStatus = fileData.progress === 100 ? 'Complete' : 'Uploading';
    const progressVariant = fileData.progress === 100  ? 'determinate' : 'indeterminate';
    return <Box  flexGrow={1}>
        <Typography variant="subtitle1"> {file?.name}</Typography>
        <Typography variant="subtitle2">
          {(file?.size / 1000000).toFixed(2)} MB • {fileStatus} 
        </Typography>

        <Grid item xs={12} sm={8} md={7} sx={{mb:3}}>
        <LinearProgress color="primary" variant={progressVariant} value={fileData?.progress} />
        </Grid>
      </Box>
  }

  const Notifications = function() {
    return fileData?.errors?.length  ? <ErrorMessages /> :  <SuccessMessages />;
  }
    



  const onDelete = () => {
  
    if(!fileData.url){
      dispatch(deleteImage(fileData));
    } else 
    {
      const payload = {
        url:[fileData.url || '']
      }
      
      dispatch(deleteItemImage(payload));
    }
    
  }
  

  return (
   
    <Grid container alignItems="start" justifyContent={true ? 'space-between': 'right'}>
      {true && <Notifications />}
      <Box alignItems="center"> 
        <IconButton
          size="large"
          onClick={onDelete}
          aria-label="Example"
        >
          <Close fontSize="medium" />
        </IconButton>
      </Box>
    </Grid>
  );
}
