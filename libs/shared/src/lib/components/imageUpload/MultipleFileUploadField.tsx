import styles from './imageUpload.module.scss';
import { Box, Grid, Icon, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { UploadError } from './UploadError';
import { UploadFile } from '@mui/icons-material';

import {
  addImage,
  updateImage,
  useAppDispatch,
  useAppSelector,
} from '@p2p-exchange/core';

let currentId = 0;

function getNewId() {
  // we could use a fancier solution instead of a sequential ID :)
  return ++currentId;
}

export interface MultipleFileUploadFieldProps {
  name: string;
  isEditForm: boolean;
}

export function MultipleFileUploadField({
  name,
  isEditForm,
}: MultipleFileUploadFieldProps) {
  const [field, meta, helpers] = useField(name);
  const dispatch = useAppDispatch();
  const { files } = useAppSelector((state) => state.postItem);

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({
      file,
      id: getNewId(),
      error: false,
      progress: 0,
      isLoading: false,
    }));
    const mappedRej = rejFiles.map((r) => ({
      ...r,
      id: getNewId(),
      error: false,
      progress: 0,
      isLoading: false,
    }));
    dispatch(addImage([...mappedAcc, ...mappedRej]));
    // setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
    // console.log('images', files);
  }, []);

  useEffect(() => {
    helpers.setValue(files);
    // console.log(files);
  }, [files]);

  function onUpload(file: File, uploadResult: any) {
    // console.log('files', files);
  }

  function onDelete(index: number) {
    // console.log(index);
  }

  function onFileDelete() {}

  const maxLength = 20;

  function customValidator(file: File) {
    // console.log(file);
    const errors = [];

    if (file.size >= 2000 * 1024) {
      errors.push({
        code: 'file-too-large',
        message: `File size is larger than 2 MB, file can't be uploaded`,
      });
    }

    return errors;
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg'],
    },
    validator: customValidator,
    // maxSize: 3000 * 1024, // 300KB
  });

  return (
    <React.Fragment>
      <Grid item className={meta.error && meta.touched ? styles.fileError : ''}>
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          <UploadFile color="primary" />
          <Box textAlign="center">
            <Link sx={{ cursor: 'pointer' }}>Click to upload </Link>
            <Typography ml={1} display="inline" variant="body1">
              {' '}
              or drag and drop{' '}
            </Typography>
          </Box>
          <Typography flexBasis={'100%'} textAlign="center" variant="subtitle2">
            PNG or JPG (max. 2MB)
          </Typography>
        </div>
      </Grid>

      {files.map((fileWrapper, index) => (
        <Grid mt={3} item key={fileWrapper.id}>
          <SingleFileUploadWithProgress
            key={fileWrapper.id}
            isEditForm={isEditForm}
            fileData={fileWrapper}
          />
        </Grid>
      ))}
    </React.Fragment>
  );
}
