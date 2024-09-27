<template>
  <div class="main-box">
    <div class="main-content">
      <drop-down :item="item" :index="index"></drop-down>
      <div class="id-box">
        <span class="id">ID</span>
        <span class="item">{{ item.id }}</span>
      </div>
    </div>

    <div class="action-container">
      <button @click.stop="toggleDeletePopup(index)" class="delete-btn">
        <img src="/src/images/icon-delete.svg" class="delete-icon" alt="" />
      </button>

      <div v-if="popupIndex === index" class="delete-popup">
        <span>Delete?</span>
        <button @click.stop="deleteItem(index)" class="confirm-btn">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deleteItem } from "@/utils/storageHelpers";
import { popupIndex } from "../utils/store.js";

import { toggleDeletePopup } from "@/utils/itemHelpers";
import DropDown from "./DropDown.vue";

defineProps({
  item: Object,
  index: Number,
});
</script>

<style scoped>
.main-box {
  display: flex;
  flex-grow: 1;
  padding: 16px 12px;
  position: relative;
}

.main-content {
  display: flex;
  flex-grow: 1;
}

.id-box {
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  width: 100%;
}

.delete-btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
}

.delete-icon {
  padding: 4px;
}

.id {
  color: #767676;
}

.item {
  font-weight: bold;
}

.action-container {
  align-content: center;
  position: relative;
}

.delete-popup {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: black;
  color: white;
  padding: 16px;
  border-radius: 12px;
  gap: 20px;
  display: flex;
  width: 134px;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.confirm-btn {
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}
</style>
