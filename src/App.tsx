import { Component, VueComponent } from "@/types/vue";
import HomeLayout from "@/layouts/HomeLayout";
import "@/styles/main.scss";

@Component({
  name: "App",
})
export class App extends VueComponent {
  render() {
    const hasHomeLayout = this.$route.meta?.layout === "home-layout";

    return hasHomeLayout ? (
      <HomeLayout>
        <router-view />
      </HomeLayout>
    ) : (
      <router-view />
    );
  }
}
