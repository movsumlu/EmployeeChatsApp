import { Commit, ActionTree } from "vuex";

import { getUserInfo } from "@/API/userAPI";
import { IRootState } from "@/store/types";

export const actions: ActionTree<IRootState, IRootState> = {
  async checkUserAuth({ commit }: { commit: Commit }) {
    try {
      const { status } = await getUserInfo();

      if (status === 200) {
        commit("SET_USER_AUTH", true);
      }

      if (status === 401) {
        commit("SET_USER_AUTH", false);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
