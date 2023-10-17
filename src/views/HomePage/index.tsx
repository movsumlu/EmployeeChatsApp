import { Component, VueComponent } from "@/types/vue";

import { EmployeeCardList } from "@/components/EmployeeCardList";
import { EmployeeInformation } from "@/components/EmployeeInformation";
import { Spinner } from "@/components/Spinner";

@Component({
  name: "HomePage",
})
export class HomePage extends VueComponent {
  mounted() {
    this.$store.dispatch("employees/fetchListOfEmployees");
  }

  get getLoading() {
    return this.$store.getters["employees/getLoading"];
  }

  render() {
    return (
      <div>
        {this.getLoading ? (
          <Spinner />
        ) : (
          <main>
            <EmployeeCardList />
            <EmployeeInformation />
          </main>
        )}
      </div>
    );
  }
}
