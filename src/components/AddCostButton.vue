<template>
  <div :class="[$style.wrapper]">
    <button @click="$emit('clicked')">
      Добавить строку расходов
    </button>
  </div>
</template>

<script>
export default {
  name: "AddCostButton",
};
</script>

<style lang="sass" module>
.wrapper button
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
