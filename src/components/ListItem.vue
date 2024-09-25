<template>
  <li
    class="item"
    :selectedIndex="selectedIndex"
    :class="{ selected: selectedIndex === index }"
  >
    <button class="drag-btn">
      <img src="/src/images/icon-drag.svg" alt="" class="drag-icon" />
    </button>
    <main-content :item="item" :index="index"></main-content>
  </li>
</template>

<script setup>
import MainContent from "./MainContent.vue";
import { selectedIndex } from "../utils/store.js";

defineProps({
  item: Object,
  index: Number,
});
</script>

<style scoped>
.selected {
  background-color: #e7e7e7b8;
}
.item {
  display: flex;
  align-items: center;
  height: 70px;
  border: 1px solid #e6e6e6d0;
  border-radius: 8px;
}

.drag-btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 23px 4px;
}

.drag-icon {
  width: 24px;
  height: 24px;
}
</style>
