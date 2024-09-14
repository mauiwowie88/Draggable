<template>
  <section>
    <div v-if="!skills.length">
      <p>No items available. Add a new item to get started.</p>
    </div>

    <div v-else>
      <draggable
        v-model="skills"
        ghost-class="ghost"
        @end="onEnd"
        :itemKey="'id'"
      >
        <template #item="{ element, index }">
          <div
            v-if="element && element.name"
            class="item"
            :class="{ selected: selectedItem === element }"
            @click="handleClick(element)"
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
                @keydown.enter="moveToIndex"
                ref="newIndexInput"
              />
              <button @click.stop="moveToIndex">Move</button>
              <button @click.stop="clearSelection(selectedItem)">Cancel</button>
            </div>
            <button @click.stop="deleteItem(index)">Delete</button>
          </div>
        </template>
      </draggable>
    </div>
    <div>
      <input
        v-model="newItemName"
        placeholder="Add Item"
        @keydown.enter="addItem"
        class="item-input"
      />
      <button @click="addItem">+</button>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import draggable from "vuedraggable";

const skills = ref(
  (JSON.parse(localStorage.getItem("skills")) || []).filter(
    (skill) => skill && skill.name
  )
);
const selectedItem = ref(null);
const newItemName = ref("");
const newIndex = ref(1);
const newIndexInput = ref(null);

watch(
  skills,
  (newSkills) => {
    localStorage.setItem("skills", JSON.stringify(newSkills));
  },
  { deep: true }
);

const handleClick = async (element) => {
  if (selectedItem.value === element) {
    selectedItem.value = null;
  } else {
    selectedItem.value = element;
    newIndex.value = 1;

    await nextTick();
    if (newIndexInput.value) {
      newIndexInput.value.focus();
      newIndexInput.value.select();
    }
  }
};

const moveToIndex = async () => {
  if (selectedItem.value && newIndex.value !== null) {
    const currentIndex = skills.value.indexOf(selectedItem.value);
    const targetIndex = newIndex.value - 1;

    if (targetIndex >= 0 && targetIndex < skills.value.length) {
      skills.value.splice(currentIndex, 1);
      skills.value.splice(targetIndex, 0, selectedItem.value);
    }
    selectedItem.value = null;
    newIndex.value = 1;

    await nextTick();
    if (newIndexInput.value) {
      newIndexInput.value.focus();
      newIndexInput.value.select();
    }
  }
};

const deleteItem = (index) => {
  if (index !== -1) {
    skills.value.splice(index, 1);
    if (selectedItem.value === skills.value[index]) {
      selectedItem.value = null;
      newIndex.value = 1;
    }
  }
};

const addItem = () => {
  if (newItemName.value.trim() === "") {
    alert("Please enter a valid item name.");
    return;
  }

  const itemExists = skills.value.some(
    (skill) => skill.name.toLowerCase() === newItemName.value.toLowerCase()
  );

  if (itemExists) {
    alert("This item already exists in the list.");
    return;
  }
  const newItem = {
    id: Date.now(),
    name: newItemName.value,
  };

  console.log(newItem);

  skills.value.push(newItem);
  newItemName.value = "";

  localStorage.setItem("skills", JSON.stringify(skills.value));
};

const clearSelection = () => {
  selectedItem.value = null;
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
  cursor: pointer;
}

.item-input {
  margin: 0;
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
