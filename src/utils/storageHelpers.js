import {
  items,
  count,
  selectedIndex,
  popupState,
  popupIndex,
} from "../utils/store.js";

export const getItems = () => {};

export const addItem = () => {
  items.value.push({ id: count.value });
  count.value++;
};

export const deleteItem = (index) => {
  items.value.splice(index, 1);
  popupIndex.value = null;
  popupState.value = false;
  selectedIndex.value = null;
};

export const deleteItems = () => {
  items.value = [];
  count.value = 1;
};
