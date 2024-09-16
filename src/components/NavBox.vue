<template>
  <nav>
    <div class="menu-box">
      <button class="nav-btn" @click="toggleMenu" id="hamburger">
        <img src="/images/menu.png" alt="Menu drop down icon." id="icon" />
      </button>
      <img src="/images/logo.png" alt="Logo image." id="logo" />
    </div>

    <div :id="isMenuOpen ? 'dropdown-menu' : 'tabs'">
      <button
        v-for="item in icons"
        :key="item.name"
        class="nav-btn"
        @click="selectTab(item.name)"
      >
        <img :src="item.icon" :alt="`${item.name} icon`" class="nav-icon" />
        <p class="item-name">{{ item.name }}</p>
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
import { ref } from "vue";
import { icons } from "../assets/db";
const emit = defineEmits(["changeTab"]);

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const selectTab = (tab) => {
  emit("changeTab", tab);
};
</script>

<style scoped>
.item-name {
  margin: 4px 0;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
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
}

.menu-box {
  display: flex;
  position: relative;
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
  width: 30px;
  height: 30px;
}

#dropdown-menu {
  position: absolute;
  top: 15%;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.nav-btn:hover {
  background-color: rgba(195, 196, 196, 0.318);
}

@media (min-width: 768px) {
  #tabs {
    display: flex;
    justify-content: center;
  }

  #hamburger {
    display: none;
  }

  #dropdown-menu {
    display: none;
  }
}

@media (max-width: 768px) {
  #tabs {
    display: none;
  }
}
</style>
