<template>
  <div :class="[$style.wrapper]">
    <header>
      <div :class="[$style.title]">Мои расходы</div>
    </header>
    <main>
      <PaymentsDisplay :items="getList()" @deletePayment="deletePayment" />
      <Pagination :currentPage="currentPage" :pagLen="getPaginationLength()" />
      <p>Сумма расходов: {{ getSum() }}. Число записей: {{ getLength() }}</p>
      <AddCostButton v-on:clicked="showForm = !showForm" />
      <a href="/add/payment/Food?value=200">Продукты 200</a>
      <a href="/add/payment/Transport?value=50">Поездки 50</a>
      <a href="/add/payment/Entertainment?value=2000">Развлечения 2000</a>
      <AddPaymentForm @addNewPayment="addNewPayment" v-show="showForm" />
      <transition name="fade">
        <context-menu />
      </transition>
    </main>
  </div>
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
  },
  beforeDestroy() {
    globalEventBus.$off();
  },
};
</script>

<style>
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 1.8s;
}

.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>

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
