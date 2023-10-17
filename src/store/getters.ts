import { GetterTree } from "vuex";
import { IRootState } from "@/store/types";

export const getters: GetterTree<IRootState, IRootState> = {
  getIsUserAuth: (state): boolean => state.isUserAuth,
};
