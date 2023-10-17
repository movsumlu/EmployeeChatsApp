import { Component, VueComponent } from "@/types/vue";
import { Button } from "@/components/Button";
import styles from "./style.module.scss";

@Component({
  name: "NotFoundPage",
})
export class NotFoundPage extends VueComponent {
  render() {
    return (
      <div class={styles.notFoundPage}>
        <h1 class={styles.text}>Упс, страница не&nbsp;найдена &#128533;</h1>

        <router-link to="/">
          <Button textOfButton="На главную страницу" />
        </router-link>
      </div>
    );
  }
}
