<template>
  <div>
    <el-row id="btn-box">
      <el-col :span="16">
        <el-button
          size="large"
          round
          class="light btn"
          @click="fetchProducts('https://fakestoreapi.com/products')"
        >
          Active
        </el-button>
        <el-button size="large" round class="light btn">Inactive</el-button>
      </el-col>
      <el-col :span="8" class="dark-btn-box">
        <el-button size="large" round class="dark btn">
          Create playlist
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  products: Array,
});

const emit = defineEmits(["update-products"]); // Emit changes to the parent

async function fetchProducts(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const productsList = data.map((product) => ({
      name: product.title,
      image: product.image,
    }));

    // Save products to local storage
    localStorage.setItem("products", JSON.stringify(productsList));

    // Emit the updated products list back to the parent
    emit("update-products", productsList);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
</script>

<style scoped>
#btn-box {
  padding-bottom: 10px;
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
.dark-btn-box {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
</style>
