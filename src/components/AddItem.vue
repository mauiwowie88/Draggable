<template>
  <div class="btns">
    <el-button round @click="addItem" class="btn">Add Item</el-button>

    <button @click="deleteItems" class="icon-btn">
      <img src="../images/delete.png" alt="" class="icon" />
    </button>
  </div>
</template>

<script setup>
import { addItem, deleteItems } from "../utils/storageHelpers";
</script>

<style scoped>
.btn {
  background-color: black;
  color: white;
  border: none;
}
.icon {
  width: 24px;
}
.icon-btn {
  border: none;
  align-self: center;
  background-color: transparent;
  padding: 0 5px;
  display: flex;
  cursor: pointer;
}

.btns {
  display: flex;
}
</style>
