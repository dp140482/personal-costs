<template>
  <div :class="[$style.context]" v-if="shown" :style="styles">
    <div
      :class="[$style.context__item]"
      v-for="item in items"
      :key="item.text"
      @click="onCLick(item)"
    >
      {{ item.text }}
    </div>
    <div :class="[$style.wrapper]" v-show="showForm">
      <input placeholder="Сумма" v-model="value" />
      <input placeholder="Категория" v-model="category" />
      <input placeholder="Дата" v-model="date" />
      <button @click="onSaveClick">Сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      items: [],
      shown: false,
      xPos: 0,
      yPos: 0,
      value: 0,
      id: 0,
      category: "",
      date: "",
      showForm: false,
    };
  },
  methods: {
    onCLick(item) {
      item.action();
    },
    onShown({ items, caller }) {
      this.items = items;
      this.shown = true;
      this.setPosition(caller);
    },
    onClose() {
      this.items = [];
      this.shown = false;
    },
    setPosition(caller) {
      const pos = caller.getBoundingClientRect();
      this.xPos = pos.left;
      this.yPos = pos.top;
    },
    onSaveClick() {
      const data = {
        id: this.id,
        value: this.value,
        category: this.category,
        date: this.date,
      };
      this.$context.EventBus.$emit("saveFromModalForm", data);
      this.showForm = false;
    },
  },
  computed: {
    styles() {
      return {
        top: `${this.yPos + 40}px`,
        left: `${this.xPos + 25}px`,
      };
    },
  },
  mounted() {
    this.$context.EventBus.$on("shown", this.onShown);
    this.$context.EventBus.$on("close", this.onClose);
    this.$context.EventBus.$on("showModalForm", (data) => {
      this.value = data.value;
      this.category = data.category;
      this.date = data.date;
      this.id = data.id;
      this.showForm = true;
    });
  },
  beforeDestroy() {
    this.$context.EventBus.$off("shown", this.onShown);
    this.$context.EventBus.$off("close", this.onClose);
    this.$context.EventBus.$off("showModalForm");
  },
};
</script>

<style lang="sass" module>
.context
  background-color: white
  border: 1px solid gray
  position: absolute
  top: 20px
  left: 20px
  padding: 0 20px
  &__item
    font-weight: normal
    line-height: 150%
    cursor: pointer

.wrapper
    margin: 20px
    display: flex
    flex-direction: column
</style>
