<template>
  <div class="list-box">
    <AddItem />

    <section v-if="items.length">
      <draggable
        v-model="items"
        ghost-class="ghost"
        :itemKey="'id'"
        @start="handleDragStart"
        @end="handleDragEnd"
      >
        <template #item="{ element, index }">
          <list-item
            :key="element.id"
            :item="element"
            :index="index"
            @click="handleItemClick(index)"
          />
        </template>
      </draggable>
    </section>

    <p v-else>List is empty.</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { items } from "../utils/store.js";
import { getItems } from "../utils/storageHelpers";
import {
  handleItemClick,
  handleDragStart,
  handleDragEnd,
} from "../utils/itemHelpers";
import draggable from "vuedraggable";
import ListItem from "./ListItem.vue";
import AddItem from "./AddItem.vue";

onMounted(() => {
  getItems();
});
</script>

<style scoped>
.icon {
  width: 24px;
}
.icon-btn {
  border: none;
  align-self: center;
  background-color: transparent;
  padding: 0 5px;
  display: flex;
  cursor: pointer;
}
.list-box {
  background-color: white;
  height: 100vh;
  padding: 1px;
}

.btns {
  display: flex;
}

.list {
  margin-top: 16px;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin: 0;
}
.btn {
  background-color: black;
  color: white;
  border: none;
}
</style>
