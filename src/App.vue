<template>
  <div>
    <nav-box></nav-box>
    <main-box></main-box>
    <app-footer></app-footer>
  </div>
</template>

<script setup>
import NavBox from "./components/NavBox.vue";
import MainBox from "./components/MainBox.vue";
import AppFooter from "./components/FooterBox.vue";
</script>

<style scoped>
#hero {
  display: grid;
  grid-template-columns: 3fr 6fr 3fr;
}
</style>
