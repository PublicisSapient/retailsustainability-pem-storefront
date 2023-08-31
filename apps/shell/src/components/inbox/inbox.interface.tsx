import { InboxDetailsProps, InboxUserDetails } from "@p2p-exchange/core";

export interface ChatBubbleProps {
  isIncoming: boolean;
  message: string;
  date: string;
  user:InboxUserDetails
}

export interface ParamsProps {
  userId: string;
  productId: string;
}

export interface ChatListProps {
  inboxList: any;
  params: any;
  chatDetails: Function;
}

// export interface InboxDetails {
//   toId: string;
//   fromId: string;
//   productId: string;
//   message: string;
//   date: string;
//   readed: boolean;
// }

export interface ChatBoxProps {
  inboxDetails:InboxDetailsProps
  loggedinUserId:string
}
