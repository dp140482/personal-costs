<template>
  <div :class="[$style.wrapper]">
    <input placeholder="Сумма" v-model="value" />
    <input placeholder="Категория" v-model="category" />
    <input placeholder="Дата" v-model="date" />
    <button @click="onSaveClick">Добавить</button>
  </div>
</template>

<script>
import { globalEventBus } from "../main";

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
      this.date = this.getCurrentDate;
    }
    if (this.category && this.value && this.date) {
      this.onSaveClick();
      globalEventBus.$emit("paginate", "last");
    }
  },
};
</script>

<style lang="sass" module>
.wrapper
    margin: 20px
    display: flex
    flex-direction: column
    align-items: flex-end
    max-width: 300px
    & input
      width: 280px
      margin-bottom: 15px
      padding: 10px
      border-left: 1px solid gainsboro
      border-right: 1px solid gainsboro
      border-top: 3px solid gainsboro
      border-bottom: 3px solid gainsboro
      border-radius: 4px
      font-size: 13pt
      &::placeholder
        color: gainsboro
    & button
      padding: 10px 55px
      margin: 15px 0
      color: white
      background-color: darkcyan
      border: none
      border-radius: 4px
      font-size: 13pt
      text-transform: uppercase
      position: relative
      &::after
        content: '+'
        position: absolute
        top: 8.5px
        right: 20px
        font-size: 16pt
</style>
