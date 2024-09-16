<template>
  <nav-box @changeTab="changeTab"></nav-box>
  <main-box :activeTab="activeTab"></main-box>
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

<style scoped></style>
