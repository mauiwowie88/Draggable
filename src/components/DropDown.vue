<template>
  <div class="box">
    <input class="input-box" :placeholder="index + 1" />
    <select
      class="dropdown"
      @click.stop
      @change="moveTo(index, Number($event.target.value))"
      :value="index"
    >
      <option disabled selected value=""></option>
      <option v-for="(item, idx) in items" :key="idx" :value="idx">
        {{ idx + 1 }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { items } from "@/utils/store";
import { moveTo } from "@/utils/itemHelpers";

defineProps({
  index: Number,
});
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
  outline: none;
  border: none;
}
</style>
