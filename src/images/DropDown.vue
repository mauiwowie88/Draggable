<template>
  <div class="box">
    <input class="input-box" :placeholder="index + 1" />
    <select v-model="selectedIndex" @change="swapItems" class="dropdown">
      <option v-for="(item, idx) in items" :key="idx">
        <span>
          {{ idx + 1 }}
        </span>
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

const props = defineProps({
  item: Object,
  index: Number,
});

const items = inject("items");
const selectedIndex = ref(props.index);
</script>

<style scoped>
.box {
  border: 1px solid #767676;
  border-radius: 50px;
  background-color: #f3f4f6;
  padding: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.dropdown {
  border: none;
  background-color: transparent;
  font-size: 14px;
  cursor: pointer;
  width: 20px;
}

.dropdown:focus {
  outline: none;
}

.input-box {
  padding: 0;
  width: 40px;
  border: none;
  margin-left: 10px;
}

.input-box:focus {
  outline: none; /* Removes the default focus outline */
  border: none; /* Ensures no border on focus */
}
</style>
