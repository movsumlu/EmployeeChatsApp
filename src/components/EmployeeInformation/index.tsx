import { Component } from "@/types/vue";

import { IEmployee } from "@/types/interfaces";
import { Helper } from "@/mixins/Helper";

import { Badge } from "@/components/Badge";
import { InputText } from "@/components/InputText";

import styles from "./style.module.scss";

@Component({
  name: "EmployeeInformation",
})
export class EmployeeInformation extends Helper {
  setSelectedEmployee(employee: IEmployee) {
    this.$store.commit("employees/SET_SELECTED_EMPLOYEE", employee);
  }

  onUpdateSelectedEmployee(field: string, value: string) {
    this.setSelectedEmployee({
      ...this.getSelectedEmployee,
      [field]: value,
    });

    this.getListOfEmployees.splice(
      this.getListOfEmployees.findIndex(
        ({ id }: IEmployee) => id === this.getSelectedEmployee.id
      ),
      1,
      this.getSelectedEmployee
    );
  }

  get getListOfEmployees() {
    return this.$store.getters["employees/getListOfEmployees"];
  }

  get getSelectedEmployee() {
    return this.$store.getters["employees/getSelectedEmployee"];
  }

  get fullName(): string {
    return this.getFullName(
      this.getSelectedEmployee.middleName,
      this.getSelectedEmployee.firstName,
      this.getSelectedEmployee.lastName
    );
  }

  get registeredDate(): Date | string {
    return this.getFormattedDate(this.getSelectedEmployee.registeredDate);
  }

  get employmentDate(): Date | string {
    return this.getFormattedDate(this.getSelectedEmployee.employmentDate);
  }

  render() {
    return (
      <section class={styles.employeeInformation}>
        <div class={styles.topSection}>
          <h2 class={styles.title}>{this.fullName}</h2>

          <Badge
            status={this.getSelectedEmployee.applicationStatus}
            class="mt8"
          />

          <table class={styles.employeeDataTable}>
            <tr>
              <td>
                <span class="defaultText_15 __gray">Заявка:</span>
                <span class="defaultText_15 __black ml8">
                  {this.getSelectedEmployee.ticket}
                </span>
              </td>
              <td>
                <span class="defaultText_15 __gray">Дата выхода:</span>
                <span class="defaultText_15 __black ml8">
                  {this.registeredDate}
                </span>
              </td>
              <td class="inlineBlock">
                <span class="defaultText_15 __gray">Статус ФП:</span>
                <Badge status={this.getSelectedEmployee.FPStatus} />
              </td>
            </tr>
            <tr>
              <td>
                <span class="defaultText_15 __gray">Логин:</span>
                <span class="defaultText_15 __black ml8">
                  {this.getSelectedEmployee.login}
                </span>
              </td>
              <td>
                <span class="defaultText_15 __gray">Дата оформления:</span>
                <span class="defaultText_15 __black ml8">
                  {this.employmentDate}
                </span>
              </td>
              <td class="inlineBlock">
                <span class="defaultText_15 __gray">Статус УЗ:</span>
                <Badge status={this.getSelectedEmployee.accountStatus} />
              </td>
            </tr>
          </table>
        </div>

        <hr class={styles.separateLine} />

        <div class={styles.bottonSection}>
          <h3 class={styles.subtitle}>Личная информация</h3>
          <div class={styles.inputWrapper}>
            <InputText
              label="Фамилия"
              placeholder="Фамилия"
              value={this.getSelectedEmployee.middleName}
              onInputTextHandler={(value: string) =>
                this.onUpdateSelectedEmployee("middleName", value)
              }
            />
            <InputText
              label="Имя"
              placeholder="Имя"
              value={this.getSelectedEmployee.firstName}
              onInputTextHandler={(value: string) =>
                this.onUpdateSelectedEmployee("firstName", value)
              }
            />
            <InputText
              label="Отчество"
              placeholder="Отчество"
              value={this.getSelectedEmployee.lastName}
              onInputTextHandler={(value: string) =>
                this.onUpdateSelectedEmployee("lastName", value)
              }
            />
          </div>

          <div class={styles.inputWrapper}>
            <div>
              <label for="age" class="defaultText_13 __gray">
                Дата рождения
              </label>
              <input
                id="age"
                type="date"
                class={styles.dateInput}
                value={this.getSelectedEmployee.age}
                onChange={(event) =>
                  this.onUpdateSelectedEmployee(
                    "age",
                    this.getValueOfHTMLElement(event)
                  )
                }
              />
            </div>
            <div>
              <label class="defaultText_13 __gray">Гражданство</label>

              <div class={styles.citizenshipSelect}>
                <select
                  onChange={(event) =>
                    this.onUpdateSelectedEmployee(
                      "citizenship",
                      this.getValueOfHTMLElement(event)
                    )
                  }
                >
                  <option value={this.getSelectedEmployee.citizenship} selected>
                    {this.getSelectedEmployee.citizenship}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="defaultText_13 __gray">Пол</label>

              <div class={styles.radioButtonWrapper}>
                <div class={styles.radioButtonItem}>
                  <input
                    id="female"
                    type="radio"
                    value="female"
                    onChange={(event) =>
                      this.onUpdateSelectedEmployee(
                        "gender",
                        this.getValueOfHTMLElement(event)
                      )
                    }
                    checked={this.getSelectedEmployee.gender === "female"}
                  />
                  <label for="female">Женский</label>
                </div>

                <div class={styles.radioButtonItem}>
                  <input
                    id="male"
                    type="radio"
                    value="male"
                    onChange={(event) =>
                      this.onUpdateSelectedEmployee(
                        "gender",
                        this.getValueOfHTMLElement(event)
                      )
                    }
                    checked={this.getSelectedEmployee.gender === "male"}
                  />
                  <label for="male">Мужской</label>
                </div>
              </div>
            </div>
          </div>

          <InputText
            label="Город проживания"
            placeholder="Город проживания"
            value={this.getSelectedEmployee.city}
            full-width-input={true}
            disabled={true}
          />
        </div>
      </section>
    );
  }
}
