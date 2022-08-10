<template>
  <v-simple-table>
    <thead>
      <tr>
        <td>№</td>
        <td>Дата</td>
        <td>Категория</td>
        <td>Сумма</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) of items" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.value }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  name: "PaymentsDisplay",
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  methods: {
    onClickContextItem(event, item) {
      const items = [
        {
          text: "Редактировать",
          action: () => {
            this.$context.EventBus.$emit("showModalForm", item);
          },
        },
        {
          text: "Удалить",
          action: () => {
            this.$emit("deletePayment", item.id);
            this.$context.close();
          },
        },
      ];
      this.$context.show({ event, items });
    },
  },
};
</script>
