import styles from './socialshare.module.scss';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import LinkIcon from '@mui/icons-material/Link';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { ContentCopy } from '@mui/icons-material';
import { openSnackBar, useAppDispatch } from '@p2p-exchange/core';

export function SocialShare({ imageUrl = '' }: { imageUrl?: string }) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const currentURL = document?.location?.href;
  // console.log('location URL', location.pathname);

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(currentURL)
      .then(() => {
        dispatch(
          openSnackBar({
            message: 'Page link copied successfully !',
          })
        );
      })
      .catch((err) => {
        dispatch(
          openSnackBar({
            message: 'Error while copy to clipboard, Please try again !',
            severity: 'error',
          })
        );
        // console.log(err);
      });
  };

  return (
    <>
      <Typography variant="body1" component="p">
        Share this link via
      </Typography>
      <Box display="flex" justifyContent="space-between" py={2} maxWidth={350}>
        <FacebookShareButton
          url={'https://p2pmarket.dev' + location.pathname}
          className={styles.socialButton}
          style={{ borderColor: '#3b5998' }}
        >
          <FacebookIcon
            size={35}
            round={true}
            bgStyle={{ fill: 'none' }}
            iconFillColor="#3b5998"
          />
        </FacebookShareButton>

        <WhatsappShareButton
          url={'https://p2pmarket.dev' + location.pathname}
          className={styles.socialButton}
          style={{ borderColor: '#25D366' }}
        >
          <WhatsappIcon
            size={30}
            round={true}
            bgStyle={{ fill: 'none' }}
            iconFillColor="#25D366"
          />
        </WhatsappShareButton>
        <TwitterShareButton
          url={'https://p2pmarket.dev' + location.pathname}
          className={styles.socialButton}
          style={{ borderColor: '#00aced' }}
        >
          <TwitterIcon
            size={35}
            round={true}
            bgStyle={{ fill: 'none' }}
            iconFillColor="#00aced"
          />
        </TwitterShareButton>

        {imageUrl && (
          <PinterestShareButton
            media={imageUrl}
            url={'https://p2pmarket.dev' + location.pathname}
            className={styles.socialButton}
            style={{ borderColor: '#cb2128' }}
          >
            <PinterestIcon
              size={35}
              round={true}
              bgStyle={{ fill: 'none' }}
              iconFillColor="#cb2128"
            />
          </PinterestShareButton>
        )}
      </Box>
      <Typography variant="body1" component="p">
        Or copy link
      </Typography>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          my: 2,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          boxShadow: 'none',
          borderColor: 'grey.200',
          border: 1,
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <LinkIcon />
        </IconButton>
        <InputBase
          sx={{ flex: 1 }}
          placeholder=""
          value={currentURL}
          readOnly
          inputProps={{ 'aria-label': 'Copy page link to share' }}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCopyClick}
          color="primary"
          sx={{ p: '10px' }}
          aria-label="directions"
        >
          <ContentCopy />
        </IconButton>
      </Paper>
    </>
  );
}
