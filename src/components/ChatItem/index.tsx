import { Component, VueComponent, Prop } from "@/types/vue";
import { IChatItem } from "@/store/modules/chats/types";
import styles from "./style.module.scss";

interface Props {
  chat: IChatItem;
}

@Component({
  name: "ChatItem",
})
export class ChatItem extends VueComponent<Props> {
  @Prop() chat!: Props["chat"];

  render() {
    return (
      <li class={styles.chatItem}>
        <p class={styles.textOfMessage}>{this.chat.title}</p>
      </li>
    );
  }
}
