<template>
  <padding-box>
    <button @click="addDiv">Add More Divs</button>
    <responsive-box :numberOfDivs="divCount"></responsive-box>
  </padding-box>
</template>

<script setup>
import { ref } from "vue";
import ResponsiveBox from "./ResponsiveBox.vue";
import PaddingBox from "./PaddingBox.vue";

// Default div count starts at 3
const divCount = ref(3);

// Add a new div when button is clicked
const addDiv = () => {
  divCount.value += 1;
};
</script>
