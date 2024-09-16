<template>
  <padding-box>
    <!-- <button @click="addDiv">Add More Divs</button> -->
    <responsive-box :numberOfDivs="divCount"></responsive-box>
  </padding-box>
</template>

<script setup>
import { ref } from "vue";
import ResponsiveBox from "./ResponsiveBox.vue";
import PaddingBox from "./PaddingBox.vue";

const divCount = ref(3);

// const addDiv = () => {
//   divCount.value += 1;
// };
</script>
