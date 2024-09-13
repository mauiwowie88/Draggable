<template>
  <nav>
    <div class="menu-box">
      <button class="nav-btn">
        <img src="/images/menu.png" alt="Menu drop down icon." id="icon" />
      </button>
      <img src="/images/logo.png" alt="Logo image." id="logo" />
    </div>
    <div id="tabs">
      <button v-for="item in icons" :key="item.name" class="nav-btn">
        <img :src="item.icon" :alt="`${item.name} icon`" class="nav-icon" />
        {{ item.name }}
      </button>
    </div>
    <div class="notis-box">
      <button class="nav-btn">
        <img src="/images/bell.png" alt="Notifications Bell Icon." id="icon" />
      </button>
    </div>
  </nav>
</template>

<script setup>
import { icons } from "../assets/db";
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}
.menu-box {
  display: flex;
}
.notis-box {
  display: flex;
  justify-content: flex-end;
}
#logo {
  width: 100px;
  height: 60px;
}

#icon {
  width: 40px;
  height: 40px;
}

#tabs {
  display: flex;
  justify-content: center;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border: none;
  background-color: white;
}

.nav-icon {
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
}

.nav-btn:hover {
  background-color: rgba(195, 196, 196, 0.318);
}

.bar {
  border: 1px solid #ccc;
  padding: 10px;
  height: 100vh;
}
</style>
