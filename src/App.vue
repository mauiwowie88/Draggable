<template>
  <div id="app">
    <nav-box @changeTab="changeTab"></nav-box>
    <main-box :activeTab="activeTab"></main-box>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBox from "./components/NavBox.vue";
import MainBox from "./components/MainBox.vue";

const activeTab = ref("Home");

const changeTab = (newTab) => {
  activeTab.value = newTab;
};
</script>

<style scoped>
body {
  margin: 0;
}
#hero {
  display: grid;
  grid-template-columns: 3fr 6fr 3fr;
}
</style>
