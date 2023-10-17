import { Module } from "vuex";

import { IChatsState } from "./types";
import { IRootState } from "@/store/types";

import { state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

const namespaced: boolean = true;

export const chats: Module<IChatsState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
