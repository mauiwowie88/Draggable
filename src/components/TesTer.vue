<template>
  <padding-box>
    <div class="cont">
      <el-button size="large" round @click="addItem" class="add-btn">
        Add Item
      </el-button>

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
            <div class="drag-box">
              <span class="material-icons">drag_indicator</span>
            </div>

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
  </padding-box>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import draggable from "vuedraggable";
import PaddingBox from "./PaddingBox.vue";

const products = ref([]);
const selectedItem = ref(null);
const showControlForItem = ref(null);
const newItemName = ref("");
const newIndex = ref(1);
const newIndexInput = ref(null);

watch(
  products,
  (newProducts) => {
    localStorage.setItem("products", JSON.stringify(newProducts));
  },
  { deep: true }
);

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
  const nextId = products.value.length + 1;

  const newItem = {
    id: nextId,
    name: `Item ${nextId.toString().padStart(3, "0")}`,
  };

  products.value.push(newItem);
  localStorage.setItem("products", JSON.stringify(products.value));
};

const clearSelection = () => {
  showControlForItem.value = null;
  selectedItem.value = null;
};

onMounted(() => {
  loadProductsFromLocalStorage();
});
</script>

<style scoped>
.drag-box {
  align-content: center;
  padding: 8px 4px;
  height: 54px;
}
.material-icons {
  font-size: 24px;
  color: #777777;
}
.cont {
  background-color: white;
}
.add-btn {
  color: white;
  background-color: black;
  border: none;
}
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
  border: 0.5px solid #eaeced;
  border-radius: 12px;
  cursor: pointer;
  height: 70px;
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
