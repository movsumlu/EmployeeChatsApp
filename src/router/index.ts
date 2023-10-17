import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import { LoginPage } from "@/views/LoginPage";
import { HomePage } from "@/views/HomePage";
import { ChatsPage } from "@/views/ChatsPage";
import { NotFoundPage } from "@/views/NotFoundPage";

import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/",
    name: "Home",
    meta: { layout: "home-layout" },
    component: HomePage,
  },
  {
    path: "/chats",
    name: "Chats",
    meta: { layout: "home-layout" },
    component: ChatsPage,
  },
  {
    path: "*",
    name: "NotFoundPage",
    meta: { layout: "home-layout" },
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userVisitedPagesFromLS = localStorage.getItem("userVisitedPages");

  const userVisitedPages = userVisitedPagesFromLS
    ? JSON.parse(userVisitedPagesFromLS)
    : [];

  userVisitedPages.push(to.name);

  localStorage.setItem("userVisitedPages", JSON.stringify(userVisitedPages));

  await store.dispatch("checkUserAuth");

  const isUserAuthorize = store.getters["getIsUserAuth"];

  if (to.name === "Login" && isUserAuthorize) {
    next({ name: "Home" });
  } else {
    next();
  }

  if (to.name !== "Login" && !isUserAuthorize) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
