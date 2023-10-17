import { Module } from "vuex";

import { state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

import { IEmployeesState } from "./types";
import { IRootState } from "@/store/types";

const namespaced: boolean = true;

export const employees: Module<IEmployeesState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
