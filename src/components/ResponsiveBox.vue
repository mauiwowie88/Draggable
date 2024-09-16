<template>
  <div class="responsive-container">
    <!-- Loop through the number passed from the parent and create divs -->
    <div v-for="n in numberOfDivs" :key="n" class="box-item"></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Accept the number of divs as a prop
defineProps({
  numberOfDivs: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.responsive-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  background-color: rgb(38, 41, 40);
  gap: 10px;
}

.box-item {
  flex: 1 1 30%;
  min-width: 220px;
  height: 100px;
  background-color: rgba(135, 206, 235, 0.6);
}
</style>
