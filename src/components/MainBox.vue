<template>
  <section class="hero">
    <div class="left bar"></div>
    <div class="main bar">
      <component :is="currentComponent"></component>
    </div>
    <div class="right bar"></div>
  </section>
</template>

<script setup>
import ListBox from "./ListBox.vue";

import { computed } from "vue";

const props = defineProps({
  activeTab: String,
});
const componentsMap = {
  Home: ListBox,
};
const currentComponent = computed(
  () => componentsMap[props.activeTab] || ListBox
);
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
