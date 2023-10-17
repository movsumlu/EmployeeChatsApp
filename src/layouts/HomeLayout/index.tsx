import Vue from "vue";
import { Header } from "@/components/Header";

export default Vue.extend({
  name: "DefaultLayout",
  components: {
    Header,
  },
  render() {
    return (
      <div>
        <Header />
        <router-view />
      </div>
    );
  },
});
