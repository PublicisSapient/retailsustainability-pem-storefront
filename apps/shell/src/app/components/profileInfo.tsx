import React from 'react';
import { Box, Link, useMediaQuery, Typography, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DefaultAvatar from '../../assets/defaultprofile.svg';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import { globalTheme as theme, useAppSelector } from '@p2p-exchange/core';
import InboxIcon from '@mui/icons-material/Inbox';
import { useNavigate } from 'react-router-dom';

type ProfileInfoProps = {
  isSelfView: boolean;
};
const profileInfo = ({ isSelfView }: ProfileInfoProps) => {
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    email,
    phoneno,
    profileImage,
    location,
    description,
    socialUrls,
    createdTime,
  } = useAppSelector((state) => state.profile);
  const [viewAll, setViewAll] = React.useState(description.length < 15);
  const handleViewAll = () => {
    setViewAll(true);
  };
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
      date
    );

    return `Member since ${month} ${year}`;
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box
        component="img"
        sx={{ height: '162.5px', width: '162.5px', mb: 2, borderRadius: '50%' }}
        src={profileImage || DefaultAvatar}
      />
      <Typography variant="h6" color="initial">
        {firstName} {lastName}
      </Typography>
      {isSelfView && (
        <>
          <Typography variant="body2" color={theme.palette.grey[700]}>
            {email}
          </Typography>
          <Typography variant="body1" color="initial" sx={{ my: 0.5 }}>
            {phoneno}
          </Typography>
        </>
      )}
      {socialUrls.length !== 0 && (
        <Link href={`//${socialUrls[0]}`} target="_blank" variant="body2">
          {socialUrls[0]}
        </Link>
      )}

      {isSelfView && (
        <Typography
          variant="body1"
          color="initial"
          sx={{ my: 0.5 }}
          textAlign={'center'}
        >
          {location}
        </Typography>
      )}
      <Divider sx={{ my: 1.5, width: '100%' }} />
      {description && (
        <>
          <Typography variant="body2" color="initial" align="center">
            {viewAll
              ? description
              : description.slice(0, description.length - 10) + '...'}
          </Typography>
          {!viewAll && (
            <Link
              onClick={handleViewAll}
              variant="body2"
              sx={{
                cursor: 'pointer',
                my: 0.5,
              }}
            >
              View More
            </Link>
          )}
        </>
      )}
      <Typography variant="body2" color={theme.palette.grey[700]}>
        {formatDate(createdTime)}
      </Typography>
      {isSelfView && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          fullWidth
          sx={{ maxWidth: '351px', my: 2 }}
          onClick={() => navigate('/account')}
        >
          Edit profile
        </Button>
      )}
    </Box>
  );
};

export default profileInfo;
