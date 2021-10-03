<template>
  <div :class="[$style.wrapper]">
    <header>
      <div :class="[$style.title]">Мои расходы</div>
    </header>
    <main>
      <PaymentsDisplay :items="getList()" />
      <Pagination :currentPage="currentPage" :pagLen="getPaginationLength()" />
      <p>Сумма расходов: {{ getSum() }}. Число записей: {{ getLength() }}</p>
      <AddCostButton v-on:clicked="showForm = !showForm" />
      <a href="/add/payment/Food?value=200">Продукты 200</a>
      <a href="/add/payment/Transport?value=50">Поездки 50</a>
      <a href="/add/payment/Entertainment?value=2000">Развлечения 2000</a>
      <AddPaymentForm @addNewPayment="addNewPayment" v-show="showForm" />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";
import AddCostButton from "./components/AddCostButton.vue";
import Pagination from "./components/Pagination.vue";
import { globalEventBus } from "./main";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    AddCostButton,
    Pagination,
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
};
</script>

<style lang="sass" module>
.wrapper
  margin: 20px

.title
  font-size: 23pt
  font-family: 'Helvetica Neue', 'Arial', sans-serif

a
  color: maroon
  padding: 0 30px 0 0
</style>
