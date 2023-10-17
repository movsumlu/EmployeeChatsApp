import { Component, VueComponent } from "@/types/vue";

import store from "@/store";
import { logoutUser } from "@/API/userAPI";

import systemIcon from "@/assets/svg-icons/logo-icon.svg";
import styles from "./style.module.scss";

@Component({
  name: "Header",
})
export class Header extends VueComponent {
  navigationItems = [
    {
      name: "Все",
      value: "all",
    },
    {
      name: "Ожидают загрузки",
      value: "idle",
    },
    {
      name: "Загружены кандидатом",
      value: "success",
    },
  ];

  onSelectNavigationItem(navigationItem: String) {
    this.$store.commit(
      "employees/SET_SELECTED_NAVIGATION_ITEM",
      navigationItem
    );
  }

  async onLogoutUser() {
    try {
      const { status } = await logoutUser();

      if (status === 200) {
        localStorage.removeItem("userVisitedPages");

        store.commit("SET_USER_AUTH", false);

        this.$router.push({
          name: "Login",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  get getSelectedNavigationItem() {
    return this.$store.getters["employees/getSelectedNavigationItem"];
  }

  get isHomePage(): boolean {
    return this.$route?.name === "Home";
  }

  get isChatsPage(): boolean {
    return this.$route?.name === "Chats";
  }

  render() {
    const chatLinkClasses = `${styles.boldLink} ${
      this.isChatsPage && styles.__active
    }`;

    return (
      <header class={styles.header}>
        <div class={styles.topSection}>
          <router-link to="/">
            <img class={styles.systemIcon} src={systemIcon} alt="logo" />
            <span class={styles.systemName}>HR</span>
          </router-link>

          <button class={styles.exitButton} onClick={() => this.onLogoutUser()}>
            Выйти
          </button>
        </div>

        <nav>
          <ul>
            {this.isHomePage &&
              this.navigationItems.map(({ name, value }) => {
                return (
                  <li
                    class={`${styles.navItem} ${
                      value === this.getSelectedNavigationItem &&
                      styles.__active
                    }`}
                    onClick={() => this.onSelectNavigationItem(value)}
                  >
                    {name}
                  </li>
                );
              })}

            {!this.isHomePage && (
              <router-link class={styles.boldLink} to="/">
                Список сотрудников
              </router-link>
            )}

            <router-link class={chatLinkClasses} to="/chats">
              Чаты
            </router-link>
          </ul>
        </nav>
      </header>
    );
  }
}
