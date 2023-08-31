import * as React from 'react';
import styles from './footer.module.scss';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useLocation } from 'react-router-dom';

import Link from '@mui/material/Link';
const pages = [
  { name: 'Terms & Conditions', url: 'termsandcondition' },
  { name: 'Privacy Policy', url: 'privacy-policy' },
  { name: 'Contact Us', url: 'contact-us' },
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export interface FooterProps {}

export function Footer(props: FooterProps) {
  const location = useLocation();
  return (
    <Paper className={styles.footer} sx={{ px: 3 }}>
      <Toolbar
        disableGutters
        sx={{
          display: 'flex',
          width: '100%',
          height: { lg: 80 },
          flexDirection: { xs: 'column', lg: 'row' },
          padding: { xs: '14px 0', lg: 0 },
          justifyContent: { xs: 'center', lg: 'space-between' },
        }}
      >
        <Box
          className={styles.link}
          sx={{
            display: 'flex',
            textAlign: { xs: 'center' },
            flexGrow: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            padding: { xs: '10px 0', lg: 0 },
          }}
        >
          {pages.map((page) => (
            // <MenuItem key={page.url} >
            <Link key={page.url} variant="body1">
              {page.name}
            </Link>
            // </MenuItem>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            ml: { lg: 3 },
            padding: { xs: '10px 0', lg: 0 },
            ...(location.pathname === '/' && {
              marginBottom: { xs: '90px', sm: 0 },
            }),
          }}
          className={styles.social}
        >
          <Link target="_blank" href="https://www.facebook.com/PublicisSapient">
            <FacebookIcon sx={{ fontSize: 24 }} />
          </Link>
          <Link target="_blank" href="https://www.youtube.com/@PublicisSapient">
            <YouTubeIcon sx={{ fontSize: 24 }} />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/company/publicissapient/"
          >
            <LinkedInIcon sx={{ fontSize: 24 }} />
          </Link>
          <Link target="_blank" href="https://twitter.com/PublicisSapient">
            <TwitterIcon sx={{ fontSize: 24 }} />
          </Link>
        </Box>
        {/* <Box
          sx={{
            display: 'flex',
            ml: { lg: 2 },
            padding: { xs: '10px 0', sm: 0 },
            ...(location.pathname === '/' && {
              marginBottom: { xs: '90px', sm: 0 },
            }),
          }}
          className={styles.copyright}
        >
          <p>© 2023 Publicis Sapient. All rights reserved.</p>
        </Box> */}
      </Toolbar>
    </Paper>
  );
}

export default Footer;
