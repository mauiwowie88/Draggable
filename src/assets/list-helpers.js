import { nextTick } from "vue"; // Assuming nextTick is being used within a Vue component

const highlightInput = (event) => {
  event.target.select();
};

const handleClick = (
  element,
  selectedItem,
  skills,
  newIndexInput,
  newIndex
) => {
  // Ensure selectedItem is initialized correctly
  if (typeof selectedItem.value !== "object" || selectedItem.value === null) {
    selectedItem.value = element; // element should be an object, not a number or primitive value
  } else if (selectedItem.value === element) {
    selectedItem.value = null;
  } else {
    const firstIndex = skills.value.indexOf(selectedItem.value);
    const secondIndex = skills.value.indexOf(element);

    // Swap the two elements
    [skills.value[firstIndex], skills.value[secondIndex]] = [
      skills.value[secondIndex],
      skills.value[firstIndex],
    ];
    selectedItem.value = null;
    newIndex.value = 1; // Reset the index
  }
};

const moveToIndex = async (selectedItem, newIndex, skills, newIndexInput) => {
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

const deleteItem = (index, selectedItem, skills, newIndex) => {
  if (index !== -1) {
    skills.value.splice(index, 1);
    if (selectedItem.value === skills.value[index]) {
      selectedItem.value = null;
      newIndex.value = 1;
    }
  }
};

const addItem = (newItemName, skills) => {
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
    id: skills.value.length + 1,
    name: newItemName.value,
  };

  skills.value.push(newItem);
  newItemName.value = "";

  localStorage.setItem("skills", JSON.stringify(skills.value));
};

const clearSelection = async (selectedItem, newIndex, newIndexInput) => {
  selectedItem.value = null;
  newIndex.value = 1;

  await nextTick();
  if (newIndexInput.value) {
    newIndexInput.value.focus();
    newIndexInput.value.select();
  }
};

const onEnd = () => {
  console.log("Drag operation completed");
};

export {
  highlightInput,
  handleClick,
  moveToIndex,
  deleteItem,
  addItem,
  clearSelection,
  onEnd,
};
