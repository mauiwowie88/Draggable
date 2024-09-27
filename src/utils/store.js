// store.js
import { ref } from "vue";

export const items = ref([{ id: 1 }, { id: 2 }, { id: 3 }]);
export let count = ref(4);
export let selectedIndex = ref(null);
export let popupState = ref(false);
export let popupIndex = ref(null);
export let dropdownState = ref(null);
