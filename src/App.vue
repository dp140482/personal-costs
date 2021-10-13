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
            <v-btn
              color="teal"
              :ripple="false"
              class="mt-5"
              dark
              @click="showForm = !showForm"
            >
              Добавить строку расходов <v-icon class="ml-3">mdi-plus</v-icon>
            </v-btn>
            <AddPaymentForm @addNewPayment="addNewPayment" v-show="showForm" />
          </v-col>
          <v-col></v-col>
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

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
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
