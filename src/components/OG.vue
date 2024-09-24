<template>
  <section>
    <el-row id="btn-box">
      <el-col :span="16">
        <el-dropdown>
          <el-button size="large" round class="light btn">
            Active
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <span>Dropdown List</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(product, index) in products"
                :key="index"
              >
                {{ product.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button size="large" round class="light btn">Inactive</el-button>
      </el-col>
      <el-col :span="8" class="dark-btn-box">
        <el-button
          size="large"
          round
          class="dark btn"
          @click="fetchProducts('https://fakestoreapi.com/products')"
        >
          Create playlist
        </el-button>
      </el-col>
    </el-row>

    <div v-if="!products.length">
      <p>No items available! Add a new item to get started.</p>
    </div>

    <div
      v-infinite-scroll="loadMoreSkills"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      style="overflow-y: auto; max-height: 400px"
    >
      <draggable v-model="products" ghost-class="ghost" :itemKey="'id'">
        <template #item="{ element, index }">
          <div
            v-if="element && element.name"
            class="item"
            :class="{
              selected: selectedItem === element && !showControlForItem,
            }"
            @click="handleItemClick(element)"
          >
            <img :src="element.image" alt="product image" width="100" />

            {{ element.name }}
            <div
              v-if="showControlForItem === element"
              style="margin-left: auto"
            >
              <label for="newIndex">Move to position:</label>
              <input
                type="number"
                id="newIndex"
                v-model.number="newIndex"
                min="1"
                :max="products.length"
                @click.stop
                placeholder="1"
                @keydown.enter="moveToIndex"
                ref="newIndexInput"
              />
              <el-button round @click.stop="moveToIndex">Move</el-button>
              <el-button round @click.stop="clearSelection">Cancel</el-button>
              <el-button round @click.stop="deleteItem(index)">
                Delete
              </el-button>
            </div>
            <div @click.stop="handleIconClick(element)">
              <img
                src="/images/dot3.png"
                alt="Menu drop down icon."
                id="icon"
              />
            </div>
          </div>
        </template>
      </draggable>
    </div>

    <div>
      <input
        v-model="newItemName"
        placeholder="Add Item"
        @keydown.enter="addItem"
        class="item-input"
      />
      <button @click="addItem">+</button>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import draggable from "vuedraggable";
import { ArrowDown } from "@element-plus/icons-vue";

const products = ref([]);
const selectedItem = ref(null);
const showControlForItem = ref(null);
const newItemName = ref("");
const newIndex = ref(1);
const newIndexInput = ref(null);
const loading = ref(false);

watch(
  products,
  (newProducts) => {
    localStorage.setItem("products", JSON.stringify(newProducts));
  },
  { deep: true }
);

async function fetchProducts(url) {
  try {
    let data = await fetch(url);
    let res = await data.json();

    const productsList = res.map((product) => ({
      name: product.title,
      image: product.image,
    }));

    products.value = productsList;
    localStorage.setItem("products", JSON.stringify(productsList));
    loadProductsFromLocalStorage();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function loadProductsFromLocalStorage() {
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    products.value = JSON.parse(storedProducts);
  } else {
    console.log("No products found in localStorage.");
  }
}

const handleItemClick = (element) => {
  if (selectedItem.value && selectedItem.value !== element) {
    const currentIndex = products.value.indexOf(selectedItem.value);
    const clickedIndex = products.value.indexOf(element);

    swapItems(currentIndex, clickedIndex);
    selectedItem.value = null;
  } else {
    selectedItem.value = element;
  }
};

const swapItems = (indexA, indexB) => {
  const temp = products.value[indexA];
  products.value[indexA] = products.value[indexB];
  products.value[indexB] = temp;
  localStorage.setItem("products", JSON.stringify(products.value));
};

const handleIconClick = async (element) => {
  if (showControlForItem.value === element) {
    showControlForItem.value = null;
    selectedItem.value = null;
  } else {
    showControlForItem.value = element;
    selectedItem.value = element;
    newIndex.value = 1;

    await nextTick();
    if (newIndexInput.value) {
      newIndexInput.value.focus();
      newIndexInput.value.select();
    }
  }
};

const moveToIndex = () => {
  if (selectedItem.value && newIndex.value !== null) {
    const currentIndex = products.value.indexOf(selectedItem.value);
    const targetIndex = newIndex.value - 1;

    if (targetIndex >= 0 && targetIndex < products.value.length) {
      products.value.splice(currentIndex, 1);
      products.value.splice(targetIndex, 0, selectedItem.value);
    }
    showControlForItem.value = null;
    selectedItem.value = null;
    newIndex.value = 1;
  }
};

const deleteItem = (index) => {
  if (index !== -1) {
    products.value.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products.value));

    if (selectedItem.value === products.value[index]) {
      selectedItem.value = null;
      newIndex.value = 1;
    }
  }
};

const addItem = () => {
  if (newItemName.value.trim() === "") {
    alert("Please enter a valid item name.");
    return;
  }

  const itemExists = products.value.some(
    (product) => product.name.toLowerCase() === newItemName.value.toLowerCase()
  );

  if (itemExists) {
    alert("This item already exists in the list.");
    return;
  }

  const newItem = {
    id: Date.now(),
    name: newItemName.value,
  };

  products.value.push(newItem);
  newItemName.value = "";
  localStorage.setItem("products", JSON.stringify(products.value));
};

const clearSelection = () => {
  showControlForItem.value = null;
  selectedItem.value = null;
};

const loadMoreSkills = () => {
  loading.value = true;

  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      products.value.push({
        id: Date.now() + i,
        name: `Skill ${products.value.length + 1}`,
      });
    }
    loading.value = false;
  }, 1000);
};
onMounted(() => {
  loadProductsFromLocalStorage();
});
</script>

<style scoped>
#icon {
  width: 40px;
  height: 40px;
}

.item img {
  width: 100px;
  height: 57px;
  margin: 11px 15px;
  object-fit: cover;
}
.dark-btn-box {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #f0f0f0;
  border: 1px solid #eaeced;
  border-radius: 4px;
  cursor: pointer;
  height: 81px;
}

.item-input {
  margin: 0;
}

.selected {
  background-color: rgba(216, 216, 216, 0.849);
}

input {
  margin-left: 10px;
  padding: 5px;
}

.ghost {
  background-color: rgb(216, 216, 216);
  opacity: 0.5;
}

.btn {
  flex: 1;
  max-width: 120px;
}

.dark {
  background-color: black;
  color: white;
  left: 0;
}

.light {
  background-color: rgb(255, 255, 255);
}
</style>
