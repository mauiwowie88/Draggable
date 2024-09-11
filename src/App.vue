<template>
  <div>
    <h1>Skills</h1>

    <!-- Draggable Component for drag-and-drop -->
    <draggable
      v-model="skills"
      ghost-class="ghost"
      @end="onEnd"
      :itemKey="'id'"
    >
      <!-- Define the item slot to render each draggable element -->
      <template #item="{ element, index }">
        <div
          class="item"
          :class="{ selected: selectedItem === element }"
          @click="handleClick(element)"
        >
          <!-- Display the index + 1 as the new order number -->
          <strong>{{ index + 1 }}. {{ element.name }}</strong>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

// Define the skills array with fixed IDs
const skills = ref([
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Vue.js" },
  { id: 3, name: "CSS" },
  { id: 4, name: "Node.js" },
  { id: 5, name: "React" },
  { id: 6, name: "TypeScript" },
  { id: 7, name: "HTML5" },
  { id: 8, name: "Express.js" },
  { id: 9, name: "MongoDB" },
  { id: 10, name: "MySQL" },
]);

// Track the selected item for swapping
const selectedItem = ref(null);

// Handle click event to swap items
const handleClick = (element) => {
  if (!selectedItem.value) {
    // If no item is selected yet, select the current one
    selectedItem.value = element;
  } else {
    // If one item is already selected, find its index and swap with the clicked item
    const firstIndex = skills.value.indexOf(selectedItem.value);
    const secondIndex = skills.value.indexOf(element);

    // Swap the items
    [skills.value[firstIndex], skills.value[secondIndex]] = [
      skills.value[secondIndex],
      skills.value[firstIndex],
    ];

    // Clear selection after the swap
    selectedItem.value = null;
  }
};

// Handle the drag end event (optional)
const onEnd = () => {
  console.log("New order:", skills.value);
};
</script>

<style scoped>
/* Styles for the draggable items */
.item {
  padding: 10px;
  background-color: #f0f0f0;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer; /* Change cursor to pointer for clickable elements */
}

.ghost {
  opacity: 0.5;
}

.flip-list-move {
  transition: transform 0.3s ease;
}

.selected {
  background-color: yellow; /* Highlight the selected item */
}
</style>
