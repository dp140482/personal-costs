<template>
  <div :class="[$style.wrapper]">
    <input placeholder="Сумма" v-model="value" />
    <input placeholder="Категория" v-model="category" />
    <input placeholder="Дата" v-model="date" />
    <button @click="onSaveClick">Save!</button>
  </div>
</template>

<script>
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
  },
};
</script>

<style lang="sass" module>
.wrapper
    color: black
</style>
