<script setup>
import { RouterView } from 'vue-router'

import HeaderNav from './components/HeaderNav.vue'
import SearchBar from './components/SearchBar.vue'
</script>

<template>
  <main class="main">
    <!-- HEADER -->
    <HeaderNav />
    <!-- SEARCH BAR -->
    <SearchBar />
    <!-- PAGE -->
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
.main {
  background-color: rgb(243 244 246);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0.5rem;
}

</style>
