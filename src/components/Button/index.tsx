import { Component, VueComponent, Prop } from "@/types/vue";
import styles from "./style.module.scss";

interface Props {
  textOfButton: string;
  disabled?: boolean;
  onClickHandler?: () => void;
}

@Component({
  name: "Button",
})
export class Button extends VueComponent<Props> {
  @Prop() textOfButton!: Props["textOfButton"];
  @Prop() disabled: Props["disabled"];

  render() {
    return (
      <button
        class={`${styles.button} ${this.disabled && styles.__disabled}`}
        disabled={this.disabled}
        onClick={() => this.$emit("clickHandler")}
      >
        {this.textOfButton}
      </button>
    );
  }
}
