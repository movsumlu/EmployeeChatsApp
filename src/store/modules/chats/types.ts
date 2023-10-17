export interface IChatsState {
  listOfChats: IChatItem[];
  showNoMoreText: boolean;
  isLoading: boolean;
}

export interface IChatItem {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: Date;
    content: string;
  };
}

export interface IFetchChatsData {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface ICreateChatData {
  title: string;
}
