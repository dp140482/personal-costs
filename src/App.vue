<template>
  <div :class="[$style.wrapper]">
    <header>
      <div :class="[$style.title]">Мои расходы</div>
    </header>
    <main>
      <PaymentsDisplay :items="getList()" />
      <Pagination
        :currentPage="currentPage"
        :pagLen="getPaginationLength()"
        @paginate="changePage"
      />
      <p>Сумма расходов: {{ getSum() }}. Число записей: {{ getLength() }}</p>
      <AddCostButton v-on:clicked="showForm = !showForm" />
      <AddPaymentForm @addNewPayment="addNewPayment" v-show="showForm" />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";
import AddCostButton from "./components/AddCostButton.vue";
import Pagination from "./components/Pagination.vue";

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
    changePage(page) {
      this.currentPage = page;
      if (this.$store.getters.getLength < this.linesOnPage * this.currentPage) {
        this.$store.dispatch({ type: "fetchData", page: this.currentPage });
      }
    },
    getPaginationLength() {
      return Math.max(2, Math.ceil(this.getLength() / 3));
    },
  },
  created() {
    this.$store.dispatch({ type: "fetchData", page: 1 });
  },
};
</script>

<style lang="sass" module>
.wrapper
  margin: 20px

.title
  font-size: 23pt
  font-family: 'Helvetica Neue', 'Arial', sans-serif
</style>
