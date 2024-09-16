<template>
  <section class="hero">
    <div class="left-box">
      <div class="menu">
        <h3>Playlists</h3>
        <ul>
          <li>Channel 1</li>
          <li>Channel 2</li>
          <li>Channel 3</li>
        </ul>
      </div>
    </div>
    <div class="main box">
      <component :is="currentComponent"></component>
    </div>
  </section>
</template>

<script setup>
import ListBox from "./ListBox.vue";
import ContentBox from "./ContentBox.vue";
import { computed } from "vue";

const props = defineProps({
  activeTab: String,
});
const componentsMap = {
  Home: ListBox,
  Content: ContentBox,
};
const currentComponent = computed(
  () => componentsMap[props.activeTab] || ListBox
);
</script>

<style scoped>
.hero {
  display: flex;
  height: 836px;
}

.left-box {
  width: 330px;
  background-color: #f8f9fa; /* Light background color */
  border-right: 2px solid #e0e0e0; /* Border on the right */
  padding: 10px;
}

.menu h3 {
  margin-bottom: 10px;
}

.menu ul {
  list-style: none;
  padding: 0;
}

.menu ul li {
  padding: 10px;
  background-color: #e3f2fd; /* Light blue background */
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.menu ul li:hover {
  background-color: #bbdefb; /* Hover state */
}

.main.box {
  width: 70%;
  padding: 20px;
}
</style>
