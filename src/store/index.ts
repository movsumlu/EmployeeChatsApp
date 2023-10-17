import Vue from "vue";
import Vuex from "vuex";

import { state } from "@/store/state";
import { getters } from "@/store/getters";
import { actions } from "@/store/actions";
import { mutations } from "@/store/mutations";

import { IRootState } from "@/store/types";

import { chats } from "@/store/modules/chats";
import { employees } from "@/store/modules/employees";

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
  state,
  getters,
  actions,
  mutations,
  modules: {
    chats,
    employees,
  },
});
