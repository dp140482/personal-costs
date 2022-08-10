<template>
  <div :class="[$style.pagination__wrapper]">
    <div @click="onClick(currentPage - 1)">&langle;</div>
    <div
      v-for="i in pagLen"
      :key="i"
      :class="{ [$style.active]: currentPage == i }"
      @click="onClick(i)"
    >
      {{ i }}
    </div>
    <div @click="onClick(currentPage + 1)">&rangle;</div>
  </div>
</template>

<script>
import { globalEventBus } from "../main";

export default {
  name: "Pagination",
  props: {
    currentPage: Number,
    pagLen: Number,
  },
  methods: {
    onClick(page) {
      if (page < 1 || page > this.pagLen) return;
      globalEventBus.$emit("paginate", page);
    },
  },
};
</script>

<style lang="sass" module>
.pagination
    font-size: 14pt
    &__wrapper
        display: flex
        justify-content: center
        border: 1px solid lightgray
        width: 200px
        margin-left: 100px
        & > div
            padding: 0 10px
            cursor: pointer

.active
    color: red
</style>
