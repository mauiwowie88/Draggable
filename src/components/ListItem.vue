<template>
  <li class="item">
    <button class="drag-btn">
      <img src="/src/images/icon-drag.svg" alt="" class="drag-icon" />
    </button>
    <main-content
      :item="item"
      :index="index"
      :selectedIndex="selectedIndex"
    ></main-content>
  </li>
</template>

<script setup>
import MainContent from "./MainContent.vue";

defineProps({
  item: Object,
  index: Number,
  selectedIndex: Number,
});
</script>

<style scoped>
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
