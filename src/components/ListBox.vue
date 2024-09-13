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
          @click="handleClick(element, index)"
        >
          <strong>{{ index + 1 }}. {{ element.name }}</strong>

          <div v-if="selectedItem === element" style="margin-left: auto">
            <label for="newIndex">Move to position:</label>
            <input
              type="number"
              id="newIndex"
              v-model.number="newIndex"
              min="1"
              :max="skills.length"
              @click.stop
              placeholder="1"
            />
            <button @click.stop="moveToIndex">Move</button>
            <button @click.stop="clearSelection">Cancel</button>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import { list } from "../assets/db";

const skills = ref(list);
const selectedItem = ref(null);
const newIndex = ref(null);

const handleClick = (element) => {
  if (!selectedItem.value) {
    selectedItem.value = element;
  } else if (selectedItem.value === element) {
    selectedItem.value = null;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 20px;
  cursor: pointer;
}

.selected {
  background-color: rgba(216, 216, 216, 0.849);
}

input {
  margin-left: 10px;
  padding: 5px;
}

button {
  margin-left: 5px;
}

.ghost {
  background-color: rgb(216, 216, 216);
  opacity: 0.5;
}
</style>
