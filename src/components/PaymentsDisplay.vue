<template>
  <div :class="[$style.wrapper]">
    {{ items }}
  </div>
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
};
</script>

<style lang="sass" module>
.wrapper
    color: black
</style>
