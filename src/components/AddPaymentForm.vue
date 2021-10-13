<template>
  <div class="grey lighten-2 pt-4 pb-4 pl-2 pr-2 mt-3">
    <v-text-field placeholder="Сумма" solo></v-text-field>
    <v-text-field placeholder="Категория" solo></v-text-field>
    <v-text-field placeholder="Дата" solo></v-text-field>
    <v-btn color="teal" :ripple="false" dark @click="onSaveClick">
      Добавить
    </v-btn>
  </div>
</template>

<script>
// import { globalEventBus } from "../main";

export default {
  data() {
    return {
      value: "",
      category: "",
      date: "",
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
