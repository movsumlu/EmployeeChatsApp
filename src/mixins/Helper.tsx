import { Component, VueComponent } from "@/types/vue";

@Component({
  name: "Helper",
})
export class Helper extends VueComponent {
  getFormattedDate(time: Date) {
    if (time) {
      const date = new Date(time);
      const dateFormatterRU = new Intl.DateTimeFormat("ru");

      return dateFormatterRU.format(date);
    }

    return "";
  }

  getFormattedTimeDate(time: Date) {
    if (time) {
      const date = new Date(time);
      const dateTimeFormatterRU = new Intl.DateTimeFormat("ru", {
        hour: "numeric",
        minute: "numeric",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      return dateTimeFormatterRU.format(date);
    }

    return "";
  }

  getFullName(
    middleName: string = "",
    firstName: string = "",
    lastName: string = ""
  ) {
    return `${middleName} ${firstName} ${lastName}`.trim();
  }

  getValueOfHTMLElement(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  isPhoneValid(phone: string): boolean {
    const RegExpOfPhone =
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return RegExpOfPhone.test(phone);
  }

  isEmailValid(email: string): boolean {
    const RegExpOfEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return RegExpOfEmail.test(email);
  }
}
