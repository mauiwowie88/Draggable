import { items, count, selectedIndex } from "../utils/store.js";

export const addItem = () => {
  const list = JSON.parse(localStorage.getItem("items")) || [];

  list.push({ id: count.value });

  count.value++;
  localStorage.setItem("count", JSON.stringify(count.value));
  localStorage.setItem("items", JSON.stringify(list));
  items.value = list;
};
export const getItems = () => {
  const list = JSON.parse(localStorage.getItem("items")) || [];
  const index = JSON.parse(localStorage.getItem("count")) || 1;
  console.log(list);
  items.value = list.map((item, idx) => ({
    ...item,
    id: item.id || idx + 1,
  }));

  count.value = index;
  selectedIndex.value = null;
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
};
