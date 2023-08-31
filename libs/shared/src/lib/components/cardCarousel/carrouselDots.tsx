import React from 'react';
import { Box } from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';
type CarouselDotsProps = {
  stepsCount: number;
  activeStep: number;
};
const carrouselDots = ({ stepsCount, activeStep }: CarouselDotsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MobileStepper
        variant="dots"
        steps={Math.ceil(Number(stepsCount.toFixed(2)))}
        position="static"
        activeStep={Math.ceil(Number(activeStep.toFixed(2)))}
        sx={{
          maxWidth: 'fit-content',
          flexGrow: 1,
        }}
        nextButton={<></>}
        backButton={<></>}
      />
    </Box>
  );
};

export default carrouselDots;
