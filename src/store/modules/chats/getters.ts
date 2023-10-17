import { GetterTree } from "vuex";
import { IRootState } from "@/store/types";
import { IChatItem, IChatsState } from "./types";

export const getters: GetterTree<IChatsState, IRootState> = {
  getListOfChats: (state): IChatItem[] => state.listOfChats,
  getShowNoMoreChatsText: (state): boolean => state.showNoMoreText,
  getLoading: (state): boolean => state.isLoading,
};
