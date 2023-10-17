import { Component, VueComponent } from "@/types/vue";

import { LoginForm } from "@/components/LoginForm";
import { RegisteryForm } from "@/components/RegisteryForm";

import { getUserInfo } from "@/API/userAPI";

import styles from "./style.module.scss";

@Component({
  name: "LoginPage",
})
export class LoginPage extends VueComponent {
  navigationItems = [
    {
      name: "Вход",
      value: "login",
    },
    {
      name: "Регистрация",
      value: "registery",
    },
  ];

  selectedNavigationItem = "login";

  async mounted() {
    try {
      const { status } = await getUserInfo();

      if (status === 200) {
        this.goToHomePage();
      }
    } catch (error) {
      console.error(error);
    }
  }

  onSelectNavigationItem(valueOfItem: string) {
    this.selectedNavigationItem = valueOfItem;
  }

  goToHomePage() {
    this.$router.push({
      name: "Home",
    });
  }

  get isLoginFormSelected(): boolean {
    return this.selectedNavigationItem === "login";
  }

  render() {
    return (
      <div class={styles.loginPageWrapper}>
        <nav>
          <ul>
            {this.navigationItems.map(({ name, value }) => {
              return (
                <li
                  class={`${
                    value === this.selectedNavigationItem && styles.__active
                  }`}
                  onClick={() => this.onSelectNavigationItem(value)}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </nav>

        <keep-alive>
          {this.isLoginFormSelected ? (
            <LoginForm onSuccessLogin={this.goToHomePage} />
          ) : (
            <RegisteryForm onSuccessRegistery={this.goToHomePage} />
          )}
        </keep-alive>
      </div>
    );
  }
}
