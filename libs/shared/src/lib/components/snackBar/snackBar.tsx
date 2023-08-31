import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { closeSnackBar, openSnackBar, useAppDispatch, useAppSelector } from '@p2p-exchange/core';
import { addImage } from '@p2p-exchange/core';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export  function Snackbars() {
  // const [open, setOpen] = React.useState(false);
  const {open, message,severity} = useAppSelector((state) => state.snackBar);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(openSnackBar({message:'Successfully Submited'}));
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeSnackBar());
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>           
          {message}
        </Alert>
      </Snackbar>
     
    </Stack>
  );
}