import { Box, Typography } from '@mui/material';
import {PageTitle } from '@p2p-exchange/shared';
import React from 'react';
  
const PageNotFound= () =>{
    return (
        <>
        <PageTitle title={'Page Not Found'} />
        <Box p={4} > 
        <Typography variant='h3'>
        404 
        </Typography>
        
        <Typography variant='h5'>
        Page Not Found
        </Typography>

        </Box>
        </>
    )
}
  
export default PageNotFound;