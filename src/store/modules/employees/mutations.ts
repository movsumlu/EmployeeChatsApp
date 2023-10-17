import { MutationTree } from "vuex";
import { IEmployeesState, TSelectedNavigationItem } from "./types";
import { IEmployee } from "@/types/interfaces";

export const mutations: MutationTree<IEmployeesState> = {
  SET_LIST_OF_EMPLOYEES(state, payload: IEmployee[]) {
    state.listOfEmployees = payload;
  },
  SET_SELECTED_EMPLOYEE(state, payload: IEmployee) {
    state.selectedEmployee = payload;
  },
  SET_SELECTED_NAVIGATION_ITEM(state, payload: TSelectedNavigationItem) {
    state.selectedNavigationItem = payload;
  },
  SET_LOADING(state, payload: boolean) {
    state.isLoading = payload;
  },
};
