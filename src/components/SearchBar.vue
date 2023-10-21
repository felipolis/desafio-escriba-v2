<script setup>
import { ref } from "vue";
import store from "../store";
import { useRoute } from "vue-router";

const route = useRoute();

const keyword = ref("");
const routeName = route.name;

const search = async () => {
  if (routeName === "pessoas") {
    store.dispatch("searchPeople", keyword.value);
  } else if (routeName === "produtos") {
    store.dispatch("searchProducts", keyword.value);
  } else if (routeName === "pedidos") {
    store.dispatch("searchOrders", keyword.value);
  }
};
</script>

<template>
  <main class="search-container">
    <div class="search-input">
      <input
        type="text"
        placeholder="Pesquisar"
        v-model="keyword"
        @input="search"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.search-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  height: 8%;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  //border-radius: 1rem;
  //background-color: white;

  .search-input {
    width: 100%;
    input {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 2rem;
      padding: 1rem;

      &:focus {
        outline: none;
      }
    }
  }
}

@media (min-width: 640px) {
  .search-container {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .search-container {
    width: 80%;
  }
}

@media (min-width: 1024px) {
  .search-container {
    width: 50%;
  }
}
</style>
