import { Component, Prop } from "@/types/vue";
import { Helper } from "@/mixins/Helper";
import styles from "./style.module.scss";

interface Props {
  label?: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  fullWidthInput?: boolean;
  onInputTextHandler?: (value: string) => string | void;
}

@Component({
  name: "InputText",
})
export class InputText extends Helper {
  @Prop() label: Props["label"];
  @Prop() value!: Props["value"];
  @Prop() placeholder: Props["placeholder"];
  @Prop() disabled: Props["disabled"];
  @Prop() fullWidthInput: Props["fullWidthInput"];
  @Prop() onInputTextHandler: Props["onInputTextHandler"];

  render() {
    const inputWrapperClasses = `${
      this.disabled ? styles.__transparencyMode : ""
    }`;

    const inputClasses = `${styles.textInput} ${
      this.fullWidthInput && styles.__fullWidth
    }`;

    return (
      <div class={inputWrapperClasses}>
        <label class={styles.textLabel}>{this.label}</label>
        <input
          type="text"
          class={inputClasses}
          disabled={this.disabled}
          value={this.value}
          placeholder={this.placeholder}
          onInput={(event) =>
            this.$emit("inputTextHandler", this.getValueOfHTMLElement(event))
          }
        />
      </div>
    );
  }
}
