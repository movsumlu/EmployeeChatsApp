import { IEmployeesState } from "./types";

export const state: IEmployeesState = {
  listOfEmployees: [],
  selectedEmployee: null,
  selectedNavigationItem: "all",
  isLoading: true,
};
