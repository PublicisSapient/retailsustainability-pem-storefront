import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { globalTheme as theme } from '@p2p-exchange/core';
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  hovered: boolean;
  onClick?: () => void;
}

export function PrevArrow(props: ArrowProps) {
  const { className, style, onClick, hovered } = props;
  return (
    <ChevronLeftIcon
      className={className}
      sx={{
        ...style,
        display: 'block',
        cursor: `${
          className?.includes('slick-disabled') ? 'default' : 'pointer'
        }`,
        position: 'relative',
        top: '-32px',
        transform: 'scale(1.37)',
        color: `${
          !className?.includes('slick-disabled') && hovered
            ? theme.palette.grey[400]
            : 'transparent'
        }`,
        '&:hover': {
          color: `${
            className?.includes('slick-disabled')
              ? 'transparent'
              : theme.palette.grey[400]
          }`,
        },
      }}
      fontSize="large"
      onClick={onClick}
    />
  );
}

export function NextArrow(props: ArrowProps) {
  const { className, style, onClick, hovered } = props;
  return (
    <ChevronRightIcon
      className={className}
      sx={{
        ...style,
        display: 'block',
        cursor: `${
          className?.includes('slick-disabled') ? 'default' : 'pointer'
        }`,
        position: 'relative',
        top: '-32px',
        transform: 'scale(1.37)',
        color: `${
          !className?.includes('slick-disabled') && hovered
            ? theme.palette.grey[400]
            : 'transparent'
        }`,
        '&:hover': {
          color: `${
            className?.includes('slick-disabled')
              ? 'transparent'
              : theme.palette.grey[400]
          }`,
        },
      }}
      fontSize="large"
      onClick={onClick}
    />
  );
}
