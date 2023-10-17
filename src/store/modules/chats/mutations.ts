import { MutationTree } from "vuex";
import { IChatItem, IChatsState } from "./types";

export const mutations: MutationTree<IChatsState> = {
  SET_LIST_OF_CHATS(state, payload: IChatItem[]) {
    state.listOfChats = payload;
  },
  SET_NO_MORE_CHATS_TEXT(state, payload: boolean) {
    state.showNoMoreText = payload;
  },
  SET_LOADING(state, payload: boolean) {
    state.isLoading = payload;
  },
};
