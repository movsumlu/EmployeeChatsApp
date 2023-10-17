import { Component, Watch } from "@/types/vue";

import { EmployeeCardItem } from "@/components/EmployeeCardItem";
import { InputSearch } from "@/components/InputSearch";

import { IEmployee } from "@/types/interfaces";
import { Helper } from "@/mixins/Helper";

import filterIcon from "@/assets/svg-icons/filtering-icon.svg";
import styles from "./style.module.scss";

@Component({
  name: "EmployeeCardList",
})
export class EmployeeCardList extends Helper {
  searchString = "";
  filteredEmployees = [];

  @Watch("searchString", { immediate: true })
  onSearchStringChanged(value: string) {
    if (value) {
      this.filteredEmployees = this.getListOfEmployees.filter(
        ({ middleName, firstName, lastName }: IEmployee) =>
          this.getFullName(middleName, firstName, lastName)
            .toLowerCase()
            .includes(value.toLowerCase())
      );
    } else {
      this.filteredEmployees = this.getListOfEmployees;
    }
  }

  @Watch("getSelectedNavigationItem", { immediate: true })
  onSelectedNavigationItemChanged(value: string) {
    this.filteredEmployees =
      value === "all"
        ? this.getListOfEmployees
        : this.getListOfEmployees.filter(
            ({ applicationStatus }: IEmployee) => applicationStatus === value
          );

    if (this.filteredEmployees.length) {
      this.setSelectedEmployee(this.filteredEmployees[0]);
    }
  }

  setSelectedEmployee(employee: IEmployee) {
    this.$store.commit("employees/SET_SELECTED_EMPLOYEE", employee);
  }

  get getListOfEmployees() {
    return this.$store.getters["employees/getListOfEmployees"];
  }

  get getSelectedNavigationItem() {
    return this.$store.getters["employees/getSelectedNavigationItem"];
  }

  render() {
    return (
      <section class={styles.employeeList}>
        <div class={styles.filteringSection}>
          <InputSearch
            onSearchInputHandler={(value: string) =>
              (this.searchString = value)
            }
          />

          <button class={styles.filteringIconWrapper}>
            <img class={styles.filteringIcon} src={filterIcon} alt="calendar" />
          </button>
        </div>

        {this.filteredEmployees.map((emplyee) => {
          return <EmployeeCardItem emplyee={emplyee} />;
        })}

        {this.searchString && !this.filteredEmployees.length && (
          <div class={styles.nonFoundText}>Увы, ничего не найдено</div>
        )}
      </section>
    );
  }
}
