<template>
  <div :class="[$style.wrapper]">
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Сумма</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of items" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.value }}</td>
          <td :class="[$style.button]">︙<ContextMenu /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ContextMenu from "./ContextMenu.vue";

export default {
  name: "PaymentsDisplay",
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
  components: {
    ContextMenu,
  },
};
</script>

<style lang="sass" module>
.wrapper
    color: black

table
    border-collapse: collapse
    font-family: 'Helvetica Neue', 'Arial', sans-serif

thead
    font-weight: bold
    text-align: left
    margin: 0
    & th
        padding: 20px 45px 20px 10px
        border-bottom: 1px solid silver

tbody
    text-align: left
    & td
        padding: 20px 45px 20px 10px
        margin: 0
        border-spacing: 0
        border-collapse: separate
        border-bottom: 1px solid silver
        font-family: 'Helvetica Neue', 'Arial', sans-serif
    & tr:last-of-type td
          border-bottom: none

.button
    font-weight: bold
    cursor: pointer
    position: relative
</style>
