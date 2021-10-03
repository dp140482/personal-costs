<template>
  <div :class="[$style.menu__wrapper]">
    <p :class="[$style.menuItem]">Редактировать</p>
    <p :class="[$style.menuItem]">Удалить</p>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
};
</script>

<style lang="sass" module>
.menu
    &__wrapper
        background-color: white
        border: 1px solid gray
        position: absolute
        top: 20px
        left: 20px
        padding: 0 20px
    &Item
        font-weight: normal
        cursor: pointer
</style>
