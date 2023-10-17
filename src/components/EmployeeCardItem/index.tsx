import { Component, Prop } from "@/types/vue";

import { Helper } from "@/mixins/Helper";
import { IEmployee } from "@/types/interfaces";
import { Badge } from "@/components/Badge";

import calendarIcon from "@/assets/svg-icons/calendar-icon.svg";
import styles from "./style.module.scss";

interface Props {
  emplyee: IEmployee;
}

@Component({
  name: "EmployeeCardItem",
})
export class EmployeeCardItem extends Helper {
  @Prop() emplyee!: Props["emplyee"];

  get fullName(): string {
    return this.getFullName(
      this.emplyee.middleName,
      this.emplyee.firstName,
      this.emplyee.lastName
    );
  }

  get registeredDate(): Date | string {
    return this.getFormattedDate(this.emplyee.registeredDate);
  }

  onSetSelectedEmployee(employee: IEmployee) {
    this.$store.commit("employees/SET_SELECTED_EMPLOYEE", employee);
  }

  render() {
    return (
      <div
        class={styles.employeeItem}
        onClick={() => this.onSetSelectedEmployee(this.emplyee)}
      >
        <p class={styles.name}>{this.fullName}</p>

        <div class={styles.bottomSection}>
          <Badge status={this.emplyee.applicationStatus} />
          <div class={styles.dateWrapper}>
            <img src={calendarIcon} alt="calendar" />
            <span class={styles.date}>{this.registeredDate}</span>
          </div>
        </div>
      </div>
    );
  }
}
