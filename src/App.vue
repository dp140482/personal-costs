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
      <div class="text-h5">Мои расходы</div>
      <PaymentsDisplay :items="getList()" @deletePayment="deletePayment" />
      <Pagination :currentPage="currentPage" :pagLen="getPaginationLength()" />
      <p>Сумма расходов: {{ getSum() }}. Число записей: {{ getLength() }}</p>
      <AddCostButton v-on:clicked="showForm = !showForm" />
      <a href="/add/payment/Food?value=200">Продукты 200</a>
      <a href="/add/payment/Transport?value=50">Поездки 50</a>
      <a href="/add/payment/Entertainment?value=2000">Развлечения 2000</a>
      <AddPaymentForm @addNewPayment="addNewPayment" v-show="showForm" />
    </v-main>
  </v-app>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";
import AddCostButton from "./components/AddCostButton.vue";
import Pagination from "./components/Pagination.vue";
import { globalEventBus } from "./main";
import ContextMenu from "./components/ContextMenu.vue";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    AddCostButton,
    Pagination,
    ContextMenu,
  },
  data() {
    return {
      showForm: false,
      currentPage: 1,
      linesOnPage: 3,
    };
  },
  methods: {
    addNewPayment(data) {
      this.$store.commit("addPayment", data);
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
    this.$context.EventBus.$on("saveFromModalForm", (data) => {
      this.$store.commit("editPayment", data);
    });
  },
  beforeDestroy() {
    globalEventBus.$off();
  },
};
</script>
