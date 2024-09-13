<template>
  <div>
    <div>
      <input
        v-model="newItemName"
        placeholder="Add Item"
        @keydown.enter="addItem"
      />
      <button @click="addItem">+</button>
    </div>

    <!-- Check if there are skills, else show a message -->
    <div v-if="skills.length">
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
                @keydown.enter="moveToIndex"
                ref="newIndexInput"
              />
              <button @click.stop="moveToIndex">Move</button>
              <button @click.stop="clearSelection">Cancel</button>
            </div>
            <button @click.stop="deleteItem(index)">Delete</button>
          </div>
        </template>
      </draggable>
    </div>

    <div v-else>
      <p>No items available. Add a new item to get started.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import draggable from "vuedraggable";

// Initialize skills array, filter out null or undefined items
const skills = ref(
  (JSON.parse(localStorage.getItem("skills")) || []).filter(
    (skill) => skill && skill.name
  )
);
const selectedItem = ref(null);
const newIndex = ref(1);
const newItemName = ref("");
const newIndexInput = ref(null);

// Watch and save to localStorage whenever the skills array is updated
watch(
  skills,
  (newSkills) => {
    localStorage.setItem("skills", JSON.stringify(newSkills));
  },
  { deep: true }
);

const handleClick = async (element) => {
  if (!selectedItem.value) {
    selectedItem.value = element;
  } else if (selectedItem.value === element) {
    selectedItem.value = null;
  } else {
    const firstIndex = skills.value.indexOf(selectedItem.value);
    const secondIndex = skills.value.indexOf(element);

    // Swap items
    if (firstIndex !== -1 && secondIndex !== -1) {
      [skills.value[firstIndex], skills.value[secondIndex]] = [
        skills.value[secondIndex],
        skills.value[firstIndex],
      ];
    }
    selectedItem.value = null;
    newIndex.value = 1;
  }

  // Auto-focus and highlight input when item is selected
  await nextTick();
  if (newIndexInput.value) {
    newIndexInput.value.focus();
    newIndexInput.value.select(); // Auto-highlight input
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
      newIndexInput.value.select(); // Auto-highlight input again after move
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
    id: Date.now(), // Use timestamp for unique id
    name: newItemName.value,
  };

  skills.value.push(newItem);
  newItemName.value = "";

  localStorage.setItem("skills", JSON.stringify(skills.value));
};

const clearSelection = async () => {
  selectedItem.value = null;
  newIndex.value = 1;

  await nextTick();
  if (newIndexInput.value) {
    newIndexInput.value.focus();
    newIndexInput.value.select(); // Ensure input is cleared and selected
  }
};

const onEnd = () => {
  console.log("Drag operation completed", skills.value); // Add a log for debugging
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
