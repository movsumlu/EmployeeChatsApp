import axios from "axios";
import { Component } from "@/types/vue";

import { InputText } from "@/components/InputText";
import { Button } from "@/components/Button";

import { Helper } from "@/mixins/Helper";
import { loginUser } from "@/API/userAPI";

import styles from "./style.module.scss";

@Component({
  name: "LoginForm",
})
export class LoginForm extends Helper {
  userData = {
    login: "",
    password: "",
  };

  errorMessage = "";

  async onLoginUser() {
    try {
      const { status } = await loginUser(this.userData);

      if (status === 200) {
        this.$emit("successLogin");
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

  onKeypressHandler(key: string) {
    if (this.areRequiredFields && key === "Enter") {
      this.onLoginUser();
    }
  }

  get areRequiredFields(): boolean {
    return !!(this.userData.login && this.userData.password);
  }

  render() {
    return (
      <div class={styles.loginWrapper}>
        <div class={styles.inputWrapper}>
          <InputText
            label="Логин"
            placeholder="Введите ваш логин"
            value={this.userData.login}
            onInputTextHandler={(value: string) =>
              (this.userData.login = value)
            }
          />

          <label for="password">Пароль</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Введите ваш пароль"
            value={this.userData.password}
            onKeypress={({ key }) => this.onKeypressHandler(key)}
            onInput={(event) =>
              (this.userData.password = this.getValueOfHTMLElement(event))
            }
          />
        </div>

        <Button
          textOfButton="Войти"
          disabled={!this.areRequiredFields}
          onClickHandler={this.onLoginUser}
        />

        {this.errorMessage && <p class="errorText">{this.errorMessage}</p>}
      </div>
    );
  }
}
