import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FileHeader } from './FileHeader';
import axios from 'axios';
import {
  UploadableFile,
  updateImage,
  uploadImage,
  useAppDispatch,
  useAppSelector,
} from '@p2p-exchange/core';

export interface SingleFileUploadWithProgressProps {
  fileData: UploadableFile;
  isEditForm: boolean;
}

export function SingleFileUploadWithProgress({
  fileData,
  isEditForm,
}: SingleFileUploadWithProgressProps) {
  const { file } = fileData;

  const [progress, setProgress] = useState(0);
  const imgsrc = URL.createObjectURL(file);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function upload() {
      if (fileData.errors.length) return;
      dispatch(uploadImage(fileData));
    }
    upload();
  }, []);

  // console.log('testing file ',fileData);

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <FileHeader fileData={fileData} />
          {(fileData.errors.length === 0 || fileData.isServerError) && (
            <img width="100%" src={imgsrc} title={file.name} />
          )}
        </CardContent>
      </Card>
    </>
  );
}
