import { GetterTree } from "vuex";

import { IEmployeesState, TSelectedNavigationItem } from "./types";
import { IRootState } from "@/store/types";
import { IEmployee } from "@/types/interfaces";

export const getters: GetterTree<IEmployeesState, IRootState> = {
  getListOfEmployees: (state): IEmployee[] => state.listOfEmployees,
  getSelectedEmployee: (state): IEmployee | null => state.selectedEmployee,
  getSelectedNavigationItem: (state): TSelectedNavigationItem =>
    state.selectedNavigationItem,
  getLoading: (state): boolean => state.isLoading,
};
