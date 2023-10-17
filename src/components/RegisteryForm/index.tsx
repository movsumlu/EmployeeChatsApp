import axios from "axios";
import { Component } from "@/types/vue";

import { InputText } from "@/components/InputText";
import { Button } from "@/components/Button";

import { Helper } from "@/mixins/Helper";
import { registeryUser } from "@/API/userAPI";

import styles from "./style.module.scss";

@Component({
  name: "RegisteryForm",
})
export class RegisteryForm extends Helper {
  userData = {
    first_name: "",
    second_name: "",
    login: "",
    email: "",
    password: "",
    phone: "",
  };

  errorMessage = "";

  async onRegisteryUser() {
    try {
      const { status } = await registeryUser(this.userData);

      if (status === 200) {
        this.$emit("successRegistery");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        this.errorMessage = error.response?.data?.reason;
      } else {
        console.error(error);
      }
    }
  }

  get areRequiredFields(): boolean {
    return !!(
      this.userData.first_name &&
      this.userData.second_name &&
      this.userData.login &&
      this.userData.phone &&
      this.isPhoneValid(this.userData.phone) &&
      this.userData.email &&
      this.isEmailValid(this.userData.email) &&
      this.userData.password
    );
  }

  render() {
    return (
      <div class={styles.loginWrapper}>
        <div class={styles.inputWrapper}>
          <InputText
            label="Фамилия"
            placeholder="Введите фамилию"
            value={this.userData.first_name}
            onInputTextHandler={(value: string) =>
              (this.userData.first_name = value)
            }
          />
          <InputText
            label="Имя"
            placeholder="Введите имя"
            value={this.userData.second_name}
            onInputTextHandler={(value: string) =>
              (this.userData.second_name = value)
            }
          />
          <InputText
            label="Логин"
            placeholder="Придумайте логин"
            value={this.userData.login}
            onInputTextHandler={(value: string) =>
              (this.userData.login = value)
            }
          />

          <label for="email">Электронная почта</label>
          <input
            id="email"
            type="email"
            name="email"
            value={this.userData.email}
            placeholder="your@mail.ru"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            onInput={(event) =>
              (this.userData.email = this.getValueOfHTMLElement(event))
            }
          />

          <label for="password">Пароль</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Придумайте пароль"
            value={this.userData.password}
            onInput={(event) =>
              (this.userData.password = this.getValueOfHTMLElement(event))
            }
          />

          <label for="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={this.userData.phone}
            placeholder="+7 (900) 123-45-67"
            onInput={(event) =>
              (this.userData.phone = this.getValueOfHTMLElement(event))
            }
          />
        </div>

        <Button
          textOfButton="Зарегистрироваться"
          disabled={!this.areRequiredFields}
          onClickHandler={this.onRegisteryUser}
        />

        {this.errorMessage && <p class="errorText">{this.errorMessage}</p>}
      </div>
    );
  }
}
