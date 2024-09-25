import { items, count } from "../utils/store.js";

export const addItem = () => {
  const list = JSON.parse(localStorage.getItem("items")) || [];

  list.push({ id: count.value });

  count.value++;
  localStorage.setItem("count", JSON.stringify(count.value));
  localStorage.setItem("items", JSON.stringify(list));
  items.value = list;
};
export const getItems = () => {
  const list = JSON.parse(localStorage.getItem("items")) || []; // Ensure it's an array
  const index = JSON.parse(localStorage.getItem("count")) || 1; // Default count to 1

  items.value = list.map((item, idx) => ({
    ...item,
    id: item.id || idx + 1,
  }));

  count.value = index;
};

export const deleteItem = (index) => {
  const list = JSON.parse(localStorage.getItem("items")) || [];
  list.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(list));
  items.value = list;
};

export const deleteItems = () => {
  localStorage.removeItem("items");
  localStorage.removeItem("count");
  items.value = [];
  count.value = 1;
  console.log("All items deleted");
};
