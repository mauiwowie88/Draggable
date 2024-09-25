import { items, selectedIndex } from "../utils/store.js";

export const handleItemClick = (index) => {
  if (selectedIndex.value === index) {
    selectedIndex.value = null;
  } else if (selectedIndex.value !== null && selectedIndex.value !== index) {
    swap(selectedIndex.value, index);
    selectedIndex.value = null;
  } else {
    selectedIndex.value = index;
  }
};

export const moveTo = (index, next) => {
  const item = items.value[index];
  if (!item) {
    console.error("Item not found at index", index);
    return;
  }

  items.value.splice(index, 1);
  items.value.splice(next, 0, item);

  localStorage.setItem("items", JSON.stringify(items.value));
};

export const swap = (indexA, indexB) => {
  const temp = items.value[indexA];
  items.value[indexA] = items.value[indexB];
  items.value[indexB] = temp;
  localStorage.setItem("items", JSON.stringify(items.value));
};

export const handleDragStart = (event) => {
  selectedIndex.value = event.oldIndex;
};

export const handleDragEnd = () => {
  selectedIndex.value = null;
};
