import { Component, Prop } from "@/types/vue";

import { Helper } from "@/mixins/Helper";
import { getApplicationStatuses } from "@/constants/applicationStatuses";

import styles from "./style.module.scss";

interface Props {
  status: string;
}

@Component({
  name: "Badge",
})
export class Badge extends Helper {
  @Prop() status!: Props["status"];

  get isIdleStatus() {
    return this.status === "idle";
  }

  get isSuccessStatus() {
    return this.status === "success";
  }

  get isActiveStatus() {
    return this.status === "active";
  }
  get isInactiveStatus() {
    return this.status === "inactive";
  }

  get textOfStatus() {
    return getApplicationStatuses(this.status)?.textOfStatus || "";
  }

  render() {
    const badgeClasses = `${styles.badge} ${
      this.isIdleStatus && styles.__awaitingUploadBg
    } ${this.isSuccessStatus && styles.__uploadedBg} ${
      (this.isActiveStatus || this.isInactiveStatus) && styles.__transparentBg
    }`;

    const dotClasses = `${styles.dot} ${
      (this.isIdleStatus || this.isInactiveStatus) && styles.__warningColor
    } ${
      (this.isSuccessStatus || this.isActiveStatus) && styles.__successColor
    }`;

    return (
      <div class={badgeClasses}>
        <span class={dotClasses}>&#8226;</span>
        <span class={styles.status}>{this.textOfStatus}</span>
      </div>
    );
  }
}
