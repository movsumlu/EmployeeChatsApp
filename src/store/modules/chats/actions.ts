import { Commit, ActionTree } from "vuex";

import { createChat, getChats } from "@/API/chatAPI";
import { IChatsState, ICreateChatData, IFetchChatsData } from "./types";
import { IRootState } from "@/store/types";

export const actions: ActionTree<IChatsState, IRootState> = {
  async fetchListOfChats(
    { commit, state }: { commit: Commit; state: IChatsState },
    { offset, limit, title }: IFetchChatsData
  ) {
    try {
      commit("SET_LOADING", true);

      const { status, data } = await getChats(offset, limit, title);

      if (status === 200) {
        commit("SET_LIST_OF_CHATS", [...state.listOfChats, ...data]);
        commit("SET_NO_MORE_CHATS_TEXT", data.length < 5 ? true : false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async createNewChat(
    { commit, state }: { commit: Commit; state: IChatsState },
    payload: ICreateChatData
  ) {
    try {
      const { status } = await createChat(payload);

      if (status === 200) {
        const { data } = await getChats(0, 1);
        commit("SET_LIST_OF_CHATS", [...data, ...state.listOfChats]);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async searchChatsByTitle(
    { commit }: { commit: Commit; state: IChatsState },
    { offset, limit, title }: IFetchChatsData
  ) {
    try {
      const { status, data } = await getChats(offset, limit, title);

      if (status === 200) {
        commit("SET_LIST_OF_CHATS", data);
        commit("SET_NO_MORE_CHATS_TEXT", data.length < 5 ? true : false);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
