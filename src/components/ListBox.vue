<template>
  <div class="list-box">
    <el-button round @click="addItem" class="btn">Add Item</el-button>
    <el-button round @click="deleteItems" class="btn">Delete Items</el-button>
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
            :key="index"
            :item="element"
            :index="index"
            :selectedIndex="selectedIndex"
            :class="{ selected: selectedIndex === index }"
            @click="handleItemClick(index)"
          />
        </template>
      </draggable>
    </section>

    <p v-else>List is empty.</p>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";
import draggable from "vuedraggable";
import ListItem from "./ListItem.vue";

let count = ref(1);
const items = ref([]);
const selectedIndex = ref(null);

const addItem = () => {
  const list = JSON.parse(localStorage.getItem("items")) || [];

  list.push({ id: count.value });

  count.value++;
  localStorage.setItem("count", JSON.stringify(count.value));
  localStorage.setItem("items", JSON.stringify(list));
  items.value = list;
};
const getItems = () => {
  const list = JSON.parse(localStorage.getItem("items"));
  const index = JSON.parse(localStorage.getItem("count"));

  if (list) {
    items.value = list.map((item, idx) => ({
      ...item,
      id: item.id || idx + 1,
    }));
  }

  if (index) count.value = index;
};

const deleteItem = (index) => {
  const list = JSON.parse(localStorage.getItem("items")) || [];
  list.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(list));
  items.value = list;
};

const deleteItems = () => {
  localStorage.removeItem("items");
  localStorage.removeItem("count");
  items.value = [];
  count.value = 1;
  console.log("All items deleted");
};

const handleItemClick = (index) => {
  if (selectedIndex.value === index) {
    selectedIndex.value = null;
  } else if (selectedIndex.value !== null && selectedIndex.value !== index) {
    console.log(index);
    swap(selectedIndex.value, index);
    selectedIndex.value = null;
  } else {
    selectedIndex.value = index;
  }
};

const swap = (indexA, indexB) => {
  const temp = items.value[indexA];
  items.value[indexA] = items.value[indexB];
  items.value[indexB] = temp;
  localStorage.setItem("items", JSON.stringify(items.value));
};

const handleDragStart = (event) => {
  selectedIndex.value = event.oldIndex;
};

const handleDragEnd = () => {
  selectedIndex.value = null;
};

provide("items", items);
provide("count", count);
provide("delete", deleteItem);

onMounted(() => {
  getItems();
});
</script>

<style scoped>
.list-box {
  background-color: white;
  height: 100vh;
  padding: 1px;
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
.selected {
  background-color: #e7e7e7b8;
}
</style>
