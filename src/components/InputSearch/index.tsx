import { Component } from "@/types/vue";
import { Helper } from "@/mixins/Helper";
import styles from "./style.module.scss";

@Component({
  name: "InputSearch",
})
export class InputSearch extends Helper {
  searchInputValue = "";
  inputFocused = false;

  onInputHandler(value: string) {
    this.searchInputValue = value;
    this.$emit("searchInputHandler", this.searchInputValue);
  }

  get placeholderText(): string {
    return this.inputFocused ? "" : "Поиск";
  }

  render() {
    const inputSearchClasses = `${styles.searchInput} ${
      !this.inputFocused && this.searchInputValue && styles.pl40
    }`;

    return (
      <div class={styles.inputSearchWrapper}>
        <input
          type="search"
          value={this.searchInputValue}
          class={inputSearchClasses}
          onFocus={() => (this.inputFocused = true)}
          onBlur={() => (this.inputFocused = false)}
          onInput={(event) =>
            this.onInputHandler(this.getValueOfHTMLElement(event))
          }
          placeholder={this.placeholderText}
        />
      </div>
    );
  }
}
