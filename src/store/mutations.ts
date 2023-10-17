import { MutationTree } from "vuex";
import { IRootState } from "@/store/types";

export const mutations: MutationTree<IRootState> = {
  SET_USER_AUTH(state, payload: boolean) {
    state.isUserAuth = payload;
  },
};
