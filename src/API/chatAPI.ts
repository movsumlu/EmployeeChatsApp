import axios from "axios";

interface ICreateChatData {
  title: string;
}

export const getChats = (
  offset: number = 0,
  limit: number = 5,
  title: string = ""
) => axios.get(`/api/v2/chats?offset=${offset}&limit=${limit}&title=${title}`);

export const createChat = (chatData: ICreateChatData) =>
  axios.post("/api/v2/chats", chatData);
