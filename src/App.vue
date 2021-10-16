<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <div class="text-h5 mt-2 mb-2">Мои расходы</div>
            <PaymentsDisplay
              :items="getList()"
              @deletePayment="deletePayment"
            />
            <div class="text-center">
              <v-pagination
                v-model="currentPage"
                :length="getPaginationLength()"
              ></v-pagination>
            </div>
            <v-chip class="mr-1 mt-3">Сумма расходов: {{ getSum() }}</v-chip>
            <v-chip class="ml-1 mt-3">Число записей: {{ getLength() }}</v-chip>
            <AddPaymentForm @addNewPayment="addNewPayment" />
          </v-col>
          <v-col>
            <DoughnutChart
              :chartData="getChartData()"
              :options="options"
              :key="barKey"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";
import { globalEventBus } from "./main";
import ContextMenu from "./components/ContextMenu.vue";
import DoughnutChart from "./components/Chart.vue";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    ContextMenu,
    DoughnutChart,
  },
  data() {
    return {
      currentPage: 1,
      linesOnPage: 3,
      barKey: 0,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    getChartData() {
      console.log("take chartData");
      return {
        labels: this.$store.getters.getUniqueCategories,
        datasets: [
          {
            data: this.$store.getters.getValuesByCategory,
            backgroundColor: [
              "red",
              "green",
              "blue",
              "yellow",
              "orange",
              "magenta",
              "cyan",
            ],
          },
        ],
      };
    },
    addNewPayment(data) {
      this.$store.commit("addPayment", data);
      this.barKey = (this.barKey + 1) % 2;
    },
    deletePayment(id) {
      this.$store.commit("deletePayment", id);
    },
    getList() {
      return this.$store.getters.getFrame(
        this.linesOnPage * (this.currentPage - 1),
        this.linesOnPage * this.currentPage
      );
    },
    getSum() {
      return this.$store.getters.getSumOfPayments;
    },
    getLength() {
      return this.$store.getters.getLength;
    },
    getPaginationLength() {
      return Math.ceil(this.getLength() / this.linesOnPage);
    },
  },
  created() {
    this.$store.dispatch({ type: "fetchData" });
    globalEventBus.$on("paginate", (page) => {
      if (page === "last") {
        this.currentPage = this.getPaginationLength();
      } else {
        this.currentPage = +page;
      }
    });
    this.showForm =
      this.$route.name === "addpayment" || this.$route.name === "addvalue";
    if (this.$route.params.page) this.changePage(+this.$route.params.page);
  },
  beforeDestroy() {
    globalEventBus.$off();
  },
};
</script>
