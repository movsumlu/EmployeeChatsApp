import { Commit, ActionTree } from "vuex";

import { getEmployees } from "@/API/employeesAPI";
import { IEmployee } from "@/types/interfaces";
import { IEmployeesState } from "./types";
import { IRootState } from "@/store/types";

export const actions: ActionTree<IEmployeesState, IRootState> = {
  async fetchListOfEmployees({ commit }: { commit: Commit }) {
    try {
      const { status, data } = await getEmployees();

      if (status === 200) {
        const employeesList: IEmployee[] = data;
        commit("SET_LIST_OF_EMPLOYEES", employeesList);

        if (employeesList.length) {
          commit("SET_SELECTED_EMPLOYEE", employeesList[0]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};
