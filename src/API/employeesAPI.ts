import axios from "axios";

export const getEmployees = () =>
  axios.get("https://mocki.io/v1/a313630c-4c1b-48ec-9714-e98005c66f11");
