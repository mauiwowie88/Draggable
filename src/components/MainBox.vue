<template>
  <section class="hero">
    <div class="left bar">Playlists</div>
    <div class="main bar">
      <list-box></list-box>
    </div>
    <div class="right bar">Content Details</div>
  </section>
</template>

<script setup>
import ListBox from "./ListBox.vue";
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 3fr 6fr 3fr;
}

.bar {
  border: 1px solid #ccc;
  padding: 10px;
  height: 100vh;
}
</style>
