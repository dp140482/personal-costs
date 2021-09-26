<template>
  <div :class="[$style.wrapper]">
    <header>
      <div :class="[$style.title]">Мои расходы</div>
    </header>
    <main>
      <PaymentsDisplay :items="getList()" />
      <p>Сумма расходов: {{ getSum() }}</p>
        <AddCostButton v-on:clicked="showForm = !showForm" />
        <AddPaymentForm @addNewPayment="addNewPayment" v-show="showForm" />
      </p>
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
      return this.$store.getters.getPaymentsList;
    },
    getSum() {
      return this.$store.getters.getSumOfPayments;
    },
  },
  created() {
    this.$store.commit("setPaymentsListData", this.fetchData());
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
