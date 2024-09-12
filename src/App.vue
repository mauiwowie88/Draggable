<template>
  <div>
    <h1>Skills</h1>
    <draggable
      v-model="skills"
      ghost-class="ghost"
      @end="onEnd"
      :itemKey="'id'"
    >
      <template #item="{ element, index }">
        <div
          class="item"
          :class="{ selected: selectedItem === element }"
          @click="handleClick(element)"
        >
          <strong>{{ index + 1 }}. {{ element.name }}</strong>
        </div>
      </template>
    </draggable>

    <div v-if="selectedItem">
      <p>
        Selected skill:
        <strong>{{ selectedItem.name }}</strong>
      </p>
      <label for="newIndex">Move to position:</label>
      <input
        type="number"
        id="newIndex"
        v-model.number="newIndex"
        min="1"
        :max="skills.length"
      />
      <button @click="moveToIndex">Move</button>
      <button @click="clearSelection">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import { list } from "./assets/list";

const skills = ref(list);
const selectedItem = ref(null);
const newIndex = ref(null);

const handleClick = (element) => {
  if (!selectedItem.value) {
    selectedItem.value = element;
  } else {
    const firstIndex = skills.value.indexOf(selectedItem.value);
    const secondIndex = skills.value.indexOf(element);

    [skills.value[firstIndex], skills.value[secondIndex]] = [
      skills.value[secondIndex],
      skills.value[firstIndex],
    ];

    selectedItem.value = null;
    newIndex.value = null;
  }
};

const moveToIndex = () => {
  if (selectedItem.value && newIndex.value !== null) {
    const currentIndex = skills.value.indexOf(selectedItem.value);
    const targetIndex = newIndex.value - 1;

    if (targetIndex >= 0 && targetIndex < skills.value.length) {
      skills.value.splice(currentIndex, 1);
      skills.value.splice(targetIndex, 0, selectedItem.value);
    }

    selectedItem.value = null;
    newIndex.value = null;
  }
};

const clearSelection = () => {
  selectedItem.value = null;
  newIndex.value = null;
};

const onEnd = () => {
  console.log("Drag operation completed");
};
</script>

<style scoped>
.item {
  padding: 10px;
  background-color: #f0f0f0;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.item:hover {
  background-color: #23c925;
}

.selected {
  background-color: yellow;
}

input {
  margin: 10px 0;
  padding: 5px;
  width: 50px;
}

.ghost {
  opacity: 0.5;
}
</style>
