import {
  Card,
  CardContent,
  createStyles,
  Grid,
  LinearProgress,
  Typography,
  withStyles
} from '@mui/material';
import { styled } from '@mui/material';
import React from 'react';
import { FileError } from 'react-dropzone';
import { FileHeader } from './FileHeader';
import { UploadableFile } from '@p2p-exchange/core';

export interface UploadErrorProps {
  fileData: UploadableFile;
}



export function UploadError({ fileData }: UploadErrorProps) {
  const {file} = fileData;
  const imgsrc = URL.createObjectURL(file);
  return (
    <React.Fragment>
      <Card sx={{ width: '100%' }}>
    <CardContent>
      <FileHeader  fileData={fileData} />
      </CardContent>
      </Card>
    </React.Fragment>
  );
}
