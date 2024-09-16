<template>
  <div id="container"><slot></slot></div>
</template>

<script setup></script>

<style scoped>
#container {
  background-color: #ece6fe;
  padding-top: 24px;
  /* height: 100vh; */
}

/* Media query for small screens (up to 768px) */
@media (max-width: 768px) {
  #container {
    padding-inline: 10px;
  }
}

/* Media query for medium screens (769px to 1280px) */
@media (min-width: 769px) and (max-width: 1280px) {
  #container {
    padding-inline: 20px;
  }
}

/* Media query for large screens (1281px and above) */
@media (min-width: 1281px) {
  #container {
    padding-inline: 40px;
  }
}

/* Media query for extra-large screens (1920px and above) */
@media (min-width: 1920px) {
  #container {
    padding-inline: 80px;
  }
}
</style>
