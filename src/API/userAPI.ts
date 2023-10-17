import axios from "axios";

interface ILoginUserData {
  login: string;
  password: string;
}

interface IRegisteryUserData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export const getUserInfo = () => axios.get("/api/v2/auth/user");

export const loginUser = (loginUserData: ILoginUserData) =>
  axios.post("/api/v2/auth/signin", loginUserData);

export const registeryUser = (registeryUserData: IRegisteryUserData) =>
  axios.post("/api/v2/auth/signup", registeryUserData);

export const logoutUser = () => axios.post("/api/v2/auth/logout");
