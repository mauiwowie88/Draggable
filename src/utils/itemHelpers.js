import {
  items,
  selectedIndex,
  popupState,
  popupIndex,
} from "../utils/store.js";

export const handleItemClick = (index) => {
  if (popupState.value) return;

  if (selectedIndex.value === index) {
    selectedIndex.value = null;
  } else if (selectedIndex.value !== null && selectedIndex.value !== index) {
    swap(selectedIndex.value, index);

    selectedIndex.value = null;
  } else {
    selectedIndex.value = index;
  }
};
export const moveToInput = (currentIndex, inputIndex) => {
  const newIndex = Number(inputIndex) - 1; // Convert user input to zero-based index

  // Validation: Check if the index is a number and within range
  if (isNaN(newIndex) || newIndex < 0 || newIndex >= items.value.length) {
    console.error("Invalid index:", inputIndex);
    return; // Exit the function if validation fails
  }

  // Check if the new index is different from the current index
  if (newIndex === currentIndex) {
    console.log("Item is already at this position.");
    return; // No need to move if the position is the same
  }

  // Move the item
  const itemToMove = items.value.splice(currentIndex, 1)[0];
  items.value.splice(newIndex, 0, itemToMove);
};

export const moveTo = (currentIndex, newIndex) => {
  if (newIndex > items.value.length) return;
  const itemToMove = items.value.splice(currentIndex, 1)[0];
  items.value.splice(newIndex, 0, itemToMove);
};

export const swap = (indexA, indexB) => {
  const temp = items.value[indexA];
  items.value[indexA] = items.value[indexB];
  items.value[indexB] = temp;
};

export const handleDragStart = (event) => {
  selectedIndex.value = event.oldIndex;
};

export const handleDragEnd = () => {
  selectedIndex.value = null;
};

export const toggleDeletePopup = (currentIndex) => {
  if (popupState.value) {
    popupState.value = false;
    popupIndex.value = null;
    document.removeEventListener("click", handleClickOutside);
  } else {
    popupState.value = true;
    popupIndex.value = currentIndex;
    document.addEventListener("click", handleClickOutside);
  }
};

export const handleClickOutside = (event) => {
  const popupElement = document.querySelector(".confirm-btn");
  if (popupElement && !popupElement.contains(event.target)) {
    popupIndex.value = null;
    popupState.value = false;
    selectedIndex.value = null;
    document.removeEventListener("click", handleClickOutside);
  }
};
