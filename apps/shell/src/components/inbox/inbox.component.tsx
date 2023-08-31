import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  capitalize,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useRef, useState } from 'react';
import { InboxUserDetails, ProductProps, postMessages, globalTheme as theme, useAppDispatch, useAppSelector } from '@p2p-exchange/core';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {
  ChatBoxProps,
  ChatBubbleProps,
  ChatListProps,
} from './inbox.interface';
import * as dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';

const chatDetails = () => {
  alert('test');
};

function ChatAvatar({fullName}:{fullName:string}) {
  let avatarName = null;
    if(fullName) {
      avatarName =  fullName.split(' ').map(name => {
        return name[0]
      }).join('').toUpperCase();
    }

  const avtarProps =  (avatarName)? {children: avatarName} : null;
  return (
    <Avatar
    sx={{ mr: 0 }}
    alt={fullName}
    src="/static/images/avatar/1.jpg"
    {...avtarProps}
  />
  )
}

export function ChatBubble({ isIncoming, message, date, user }: ChatBubbleProps) {
  return (  
      <ListItem
        disablePadding
        sx={{ my: 1, flexDirection: isIncoming ? 'row' : 'row-reverse' }}
        alignItems="center"
      >
        {isIncoming && (
          <ListItemAvatar>
           
           <ChatAvatar fullName={user?.userName} />
              

          </ListItemAvatar>
        )}
        <Grid item sm={8} xs={10}>
          <ListItemText
            sx={{
              background: isIncoming ? '#E8F5E9' : '#E3F2FD',
              display: 'flex',
              justifyContent: 'space-between',
              px: 1.5,
              py: 1,
              borderRadius: 2.5,
              borderBottomLeftRadius: 0,
            }}
            primary={
              <Typography component="p" variant="body2" color="text.primary">
                {message}
              </Typography>
            }
            secondary={
              <Typography
                ml={2}
                component="p"
                variant="body2"
                color="text.primary"
              >
                {dayjs(date).format('HH:mm')}
              </Typography>
            }
          />
        </Grid>
      </ListItem>
  );
}

export function DateList({date}:{date:string}) {
  return (
    <ListItem
      disablePadding
      sx={{ my: 1, display: 'block', textAlign: 'center' }}
      alignItems="center"
    >
      <ListItemText
        sx={{
          background: theme.palette.background.paper,
          display: 'inline-block',
          px: 1.5,
          py: 1,
          borderRadius: 2.5,
        }}
        primary={
          <Typography component="p" variant="body2" color="text.primary">
           {date}
          </Typography>
        }
      />
    </ListItem>
  );
}

export function ChatList({ inboxList, params, chatDetails }: ChatListProps) {
  
  return inboxList.map((item: any, index: number) => (
    <ListItem disablePadding key={`${item.toId}-${item.productId}`}>
      <ListItemButton
        selected={
          params.userId === item.toId && params.productId === item.productId
        }
        onClick={() => chatDetails(item.toId, item.productId)}
      >
        <ListItemAvatar>
          <ChatAvatar fullName={item.userName} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              component="h6"
              variant="h6"
              fontSize={16}
              fontWeight={item.isRead ? 600 : 700}
              color="text.primary"
            >
              {item.userName}
            </Typography>
          }
          secondary={
            <Typography
              fontWeight={600}
              component="p"
              variant="body2"
              color="text.primary"
            >
              {item.productName}
            </Typography>
          }
        />

          <IconButton aria-label="More" sx={{ position:'absolute', right:'16px', top:'10px'  }}>
          <MoreVertIcon  />
          </IconButton>
      
      </ListItemButton>
    </ListItem>
    ))
  
}

export function ChatBox({ inboxDetails, loggedinUserId }: ChatBoxProps) {
  const {message, product, user} = inboxDetails;

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    const height = messagesEndRef.current?.firstChild?.clientHeight || 200;
    messagesEndRef.current?.scrollTo({
      top: height+100,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    scrollToBottom()
  }, [message]);
  return (
    <React.Fragment>
      <Box sx={{mb:2, ml:-1,display:{xs:'flex',sm:'none'}}}  > <Link to="/inbox" style={{display:'flex'}} > <ChevronLeft />Back to Inbox </Link></Box>
      <ProductView product={product} />
      <Box py={2} maxHeight={350} minHeight={200}  ref={messagesEndRef} overflow="auto">
        <List>
          {message.map((chat: any,index:number) => {
            const currentDate = dayjs(chat.date).format('DD/MM/YYYY');
            const prevDate = message[index-1]?.date ? dayjs(message[index-1]?.date).format('DD/MM/YYYY') : '';
            {currentDate} 
            return (<React.Fragment key={chat.id}>
            {currentDate != prevDate &&  <DateList   date={currentDate}  />}
            <ChatBubble
              
              isIncoming={chat.fromId !== loggedinUserId}
              message={chat.message}
              user={inboxDetails.user}
              date={chat.date}
            />
            </React.Fragment>)
          })}
        </List>
      </Box>
      <ChatArea loggedinUserId={loggedinUserId} inboxUser={user} />
    </React.Fragment>
  );
}

function ProductView({product}:{product:ProductProps}) {
  
  return (
    <List
      sx={{
        width: '100%',
        background: theme.palette.grey['A100'],
        p: 0,
        pb: 1,
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            sx={{ borderRadius: 0, minHeight: '50px', width: '50px' }}
            alt={product?.name}
            src={product?.images}
          />
        </ListItemAvatar>
        <ListItemText
          sx={{ ml: 2 }}
          primary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {product?.name}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                ${product?.price || '0.00'}
              </Typography>

              <Typography
                sx={{
                  display: 'inline',
                  float: 'right',
                  background: '#E1F5FE',
                  border: '1px solid #E0E0E0',
                  py: 0.75,
                  px: 2,
                  borderRadius: '30px',
                }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {product?.offerType}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

export function ChatArea({loggedinUserId,inboxUser}:{loggedinUserId:string,inboxUser:InboxUserDetails}) {
  const [message, setMessage] = useState<string>('');
  const dispatch = useAppDispatch();
  const urlParms = useParams();
  
  const postChatMessage= () => {
    dispatch(postMessages({
      toId:urlParms.userId,
      fromId:loggedinUserId,
      message:message,
      productId:urlParms.productId
    }))
    setMessage('');
  }
  return (
    <Box
      sx={{
        background: theme.palette.grey['A100'],
        px: 2,
        pt: 1,
        pb: 2,
        mt: 3,
      }}
    >
      <List dense>
        <ListItem disablePadding>
          <ListItemAvatar>
          <ChatAvatar fullName={inboxUser?.userName} />
            {/* <Avatar alt={inboxUser?.userName} src={`/static/images/avatar/1.jpg`} /> */}
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                sx={{ display: 'inline', textTransform:'capitalize' }}
                component="span"
                variant="h6"
                color="text.primary"
              >
                {inboxUser?.userName}
              </Typography>
            }
          />
        </ListItem>
      </List>
      <FormControl
        sx={{ my: 2, minWidth: 120, width: '100%', background: 'white' }}
      >
        <TextField
          id="outlined-textarea"
          label=""
          placeholder="Type a Message"
          multiline
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={3}
          variant="outlined"
          inputProps={{
            maxLength: 100,
          }}
        />
      </FormControl>
      <Button disabled={!message} onClick={postChatMessage} variant="contained">Send message</Button>
    </Box>
  );
}

export function EmptyBox({emptyMessage}:{emptyMessage:string}) {
  return (
    <Box width="100%" justifyContent="center" display="flex" flexWrap="wrap">
      <Typography
        variant="subtitle1"
        textAlign="center"
        component="p"
        width="100%"
      >
        {emptyMessage}
      </Typography>
      <ChatBubbleOutlineIcon
        fontSize="large"
        color="disabled"
        sx={{ display: 'block' }}
      >
      </ChatBubbleOutlineIcon>
    </Box>
  );
}
