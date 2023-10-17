import { Component, VueComponent } from "@/types/vue";
import styles from "./style.module.scss";

@Component({
  name: "Spinner",
})
export class Spinner extends VueComponent {
  render() {
    const circleClasses = `${styles.svg} ${styles.bg}`;
    const loadClasses = `${styles.svg} ${styles.animate}`;

    return (
      <div class={styles.loader}>
        <svg height="100" width="100" viewBox="0 0 100 100">
          <circle class={circleClasses} cx="50" cy="50" r="45" />
          <circle class={loadClasses} cx="50" cy="50" r="45" />
        </svg>
        <h3 class={styles.text}>Загрузка ...</h3>
      </div>
    );
  }
}
