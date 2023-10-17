import { IEmployee } from "@/types/interfaces";

export interface IEmployeesState {
  listOfEmployees: IEmployee[];
  selectedEmployee: IEmployee | null;
  selectedNavigationItem: TSelectedNavigationItem;
  isLoading: boolean;
}

export type TSelectedNavigationItem = "all" | "idle" | "success";
