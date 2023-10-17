import { Component, VueComponent } from "@/types/vue";

import { IChatItem } from "@/store/modules/chats/types";

import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { ChatItem } from "@/components/ChatItem";
import { InputSearch } from "@/components/InputSearch";

import styles from "./style.module.scss";

interface IFetchChatsData {
  offset?: number;
  limit?: number;
  title?: string;
}

interface ICreateChatData {
  title: string;
}

interface ISearchChatsData {
  offset: number;
  limit: number;
  title: string;
}

@Component({
  name: "ChatsPage",
})
export class ChatsPage extends VueComponent {
  newChatTitle = "";
  searchChatTitle = "";
  countOfOffsetChats = 0;

  mounted() {
    this.fetchListOfChats({
      offset: this.countOfOffsetChats,
    });
  }

  fetchListOfChats(fetchData: IFetchChatsData) {
    this.$store.dispatch("chats/fetchListOfChats", fetchData);
  }

  createNewChat(data: ICreateChatData) {
    this.$store.dispatch("chats/createNewChat", data);
  }

  searchChatsByTitle(data: ISearchChatsData) {
    this.countOfOffsetChats = 0;
    this.$store.dispatch("chats/searchChatsByTitle", data);
  }

  loadNexPage() {
    this.countOfOffsetChats += 5;

    this.fetchListOfChats({
      offset: this.countOfOffsetChats,
      title: this.searchChatTitle,
    });
  }

  createNewChatHandler() {
    this.createNewChat({
      title: this.newChatTitle,
    });

    this.newChatTitle = "";
  }

  searchChatsHandler() {
    this.searchChatsByTitle({
      offset: 0,
      limit: 5,
      title: this.searchChatTitle,
    });
  }

  onScrollHandler({ target }: any) {
    const { scrollTop, clientHeight, scrollHeight } = target;

    if (
      scrollTop + clientHeight >= scrollHeight &&
      !this.getShowNoMoreChatsText
    ) {
      this.loadNexPage();
    }
  }

  get getListOfChats() {
    return this.$store.getters["chats/getListOfChats"];
  }

  get getShowNoMoreChatsText() {
    return this.$store.getters["chats/getShowNoMoreChatsText"];
  }

  get lengthOfListOfChat() {
    return this.getListOfChats.length;
  }

  render() {
    const chatList = this.lengthOfListOfChat ? (
      this.getListOfChats.map((chat: IChatItem) => <ChatItem chat={chat} />)
    ) : (
      <p class={styles.emptyText}>Увы, чатов нет!</p>
    );

    const textOfChatLoader = this.getShowNoMoreChatsText
      ? "Сообщений больше нет"
      : "Загрузка...";

    return (
      <div class={styles.chatWrapper}>
        <div class={styles.leftAside}>
          <InputText
            value={this.newChatTitle}
            onInputTextHandler={(value: string) => (this.newChatTitle = value)}
            placeholder="Введите новое сообщение"
          />
          <Button
            textOfButton="Добавить новое сообщение"
            class={styles.addButton}
            onClickHandler={this.createNewChatHandler}
          />
          <InputSearch
            class={styles.inputSearch}
            onSearchInputHandler={(value: string) =>
              (this.searchChatTitle = value)
            }
          />
          <Button
            textOfButton="Поиск по заголовку сообщения"
            class={styles.addButton}
            onClickHandler={this.searchChatsHandler}
          />
        </div>
        <div class={styles.rightAside}>
          <h2 class={styles.title}>Сообщения:</h2>
          {
            <ul
              class={styles.chatList}
              onScroll={(event: UIEvent) => this.onScrollHandler(event)}
            >
              {chatList}

              <p class={styles.showLoadText}>{textOfChatLoader}</p>
            </ul>
          }
        </div>
      </div>
    );
  }
}
