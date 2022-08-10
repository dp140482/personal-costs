<template>
  <v-dialog v-model="showForm" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="teal"
        :ripple="false"
        class="mt-5"
        dark
        @click="showForm = !showForm"
      >
        Добавить строку расходов
        <v-icon class="ml-3">mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Форма добавления расходов</v-card-title>
      <v-card-text background="indigo">
        <v-text-field label="Сумма" v-model="value" solo></v-text-field>
        <v-text-field label="Категория" v-model="category" solo></v-text-field>
        <v-text-field label="Дата" v-model="date" solo></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal" :ripple="false" dark @click="onSaveClick">
          Добавить
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import { globalEventBus } from "../main";

export default {
  data() {
    return {
      value: "",
      category: "",
      date: "",
      showForm: false,
    };
  },
  computed: {
    getCurrentDate() {
      return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date());
    },
  },
  methods: {
    onSaveClick() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
      };
      this.$emit("addNewPayment", data);
    },
    translateCategory(category) {
      switch (category) {
        case "Transport":
          return "Поездки";
        case "Food":
          return "Продукты";
        case "Sport":
          return "Спорт";
        case "Entertainment":
          return "Развлечения";
        case "Education":
          return "Образование";
      }
      return category;
    },
  },
  created() {
    if (this.$route) {
      this.category = this.translateCategory(this.$route.params.category);
      this.value = this.$route.query.value;
      this.date = this.$route.query.date || this.getCurrentDate;
    }
    /*
    if (this.category && this.value && this.date) {
      this.onSaveClick();
      globalEventBus.$emit("paginate", "last");
    }
    */
  },
};
</script>
