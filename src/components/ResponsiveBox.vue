<template>
  <div class="responsive-container">
    <div v-for="(_, index) in $slots.default()" :key="index" class="box-item">
      <slot :index="index"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.responsive-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 2vw;
  background-color: rgb(38, 41, 40);
  box-sizing: border-box;
  margin: 10px 0;
}

.box-item {
  flex: 1 1 30%;
  min-width: 250px;
  height: 100px;
  background-color: rgba(135, 206, 235, 0.6);
  margin: 10px;
  text-align: center;
}
</style>
