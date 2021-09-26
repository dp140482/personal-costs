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

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    AddCostButton,
  },
  data() {
    return {
      paymentsList: [],
      showForm: false,
    };
  },
  methods: {
    fetchData() {
      return [
        {
          date: "28.03.2020",
          category: "Еда",
          value: 169,
        },
        {
          date: "24.03.2020",
          category: "Транспорт",
          value: 360,
        },
        {
          date: "24.03.2020",
          category: "Еда",
          value: 532,
        },
      ];
    },
    addNewPayment(data) {
      this.paymentsList = [...this.paymentsList, data];
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
