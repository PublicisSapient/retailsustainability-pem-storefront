import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
  Card,
  CardContent,
  Link,
  Autocomplete,
  List,
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  ListSubheader,
  Badge,
  ListItemButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  fetchInboxList,
  fetchMessages,
  fetchNotificationCount,
  flushInbox,
  setInfoMsg,
  globalTheme as theme,
  useAppDispatch,
  useAppSelector,
} from '@p2p-exchange/core';
import { Delete, Email } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BreadCrumbs,
  PageTitle,
  ChatBox,
  ChatList,
  EmptyBox,
} from '@p2p-exchange/shared';

/* eslint-disable-next-line */

const PageWrapper = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function InboxPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { inboxcount, inboxList, inboxDetails } = useAppSelector(
    (state) => state.inbox
  );
  const { message } = inboxDetails;
  const urlParms = useParams();
  const { id } = useAppSelector((state) => state.user);
  const breadCrumbsConfig = [
    { buttonText: 'Home', buttonUrl: '/' },
    { buttonText: 'Inbox', buttonUrl: '/inbox' },
  ];
  const chatDetails = (userId: string, productId: string) => {
    navigate(`/inbox/${userId}/${productId}`);
  };

  const fetchInboxApi = () => {
    dispatch(fetchNotificationCount());
    dispatch(fetchInboxList());
  };

  const fetchInboxDetailApi = () => {
    if (urlParms.userId && urlParms.productId) {
      dispatch(
        fetchMessages({
          userId: urlParms.userId,
          productId: urlParms.productId,
        })
      );
    }
  };

  const refreshInbox = () => {
    fetchInboxApi();
    fetchInboxDetailApi();
  };

  useEffect(() => {
    fetchInboxApi();
    return () => {
      dispatch(flushInbox());
    };
  }, []);

  useEffect(() => {
    fetchInboxDetailApi();
  }, [urlParms.userId, urlParms.productId]);
  useEffect(() => {
    if (!id) {
      dispatch(
        setInfoMsg('To start a conversation, please login in to your account.')
      );
      navigate('/signin');
    }
  }, [id]);

  return (
    <>
      <PageTitle title={'Inbox'} />
      <PageWrapper fixed sx={{ px: 0 }}>
        <Box sx={{ px: 2 }}>
          <BreadCrumbs data={breadCrumbsConfig} />
        </Box>

        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              display: { sm: 'flex', xs: urlParms.userId ? 'none' : 'flex' },
            }}
          >
            <List
              sx={{
                width: '100%',
                padding: 0,
                minHeight: { xs: 'auto', md: 500 },
                bgcolor: theme.palette.background.default,
                '& .MuiListItem-root:not(:last-child)': {
                  borderBottom: ' solid rgba(0, 0, 0, 0.12)',
                  position: 'relative',
                },
                '& .MuiListItemSecondaryAction-root': {
                  top: 30,
                  display: 'flex',
                  verticalAlign: 'top',
                },
              }}
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{
                    background: '#E0E0E0',
                    height: 80,
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="h6"
                      color="text.primary"
                    >
                      Inbox
                    </Typography>
                    <Badge
                      sx={{ ml: 2 }}
                      badgeContent={inboxcount}
                      color="secondary"
                    >
                      <Email fontSize="small" />
                    </Badge>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      aria-label="Reload Inbox"
                      onClick={refreshInbox}
                    >
                      <SyncIcon />
                    </IconButton>
                    <IconButton aria-label="More">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </ListSubheader>
              }
            >
              {inboxList?.length ? (
                <ChatList
                  inboxList={inboxList}
                  params={urlParms}
                  chatDetails={chatDetails}
                />
              ) : (
                <ListItem sx={{ minHeight: '330px' }} disablePadding>
                  <EmptyBox emptyMessage="All conversations will show up here." />
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid
            item
            sm={7}
            xs={12}
            sx={{
              display: { sm: 'block', xs: urlParms.userId ? 'block' : 'none' },
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                background: theme.palette.background.default,
                p: 2,
                minHeight: { xs: 300, md: 500 },
                alignItems: 'center',
                display: message?.length ? 'block' : 'flex',
              }}
              square
            >
              {message?.length ? (
                <ChatBox inboxDetails={inboxDetails} loggedinUserId={id} />
              ) : (
                <EmptyBox emptyMessage="Select a conversation to view" />
              )}
            </Paper>
          </Grid>
        </Grid>
      </PageWrapper>
    </>
  );
}

export default InboxPage;
