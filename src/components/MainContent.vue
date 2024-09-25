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
      <button @click.stop="toggleDeletePopup" class="delete-btn">
        <img src="/src/images/icon-delete.svg" class="delete-icon" alt />
      </button>

      <div v-if="showDeletePopup" class="delete-popup">
        <span>Delete?</span>
        <button @click="deleteItem(props.index)" class="confirm-btn">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { deleteItem } from "@/utils/storageHelpers";
import { selectedIndex } from "@/utils/store";

import DropDown from "./DropDown.vue";
const showDeletePopup = ref(false);
const props = defineProps({
  item: Object,
  index: Number,
});

const toggleDeletePopup = () => {
  if (showDeletePopup.value) {
    selectedIndex.value = null;
  } else {
    selectedIndex.value = props.index;
  }
};
watch(selectedIndex, (newIndex) => {
  showDeletePopup.value = newIndex === props.index;
});

onMounted(() => {});
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

/* Popup styling */
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
