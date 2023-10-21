<script setup>
const search = async () => {};
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
    <div class="search-button">
      <button @click="search">Pesquisar</button>
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
    width: 70%;
    input {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 0.5rem;
      padding: 1rem;

      &:focus {
        outline: none;
      }
    }
  }

  .search-button {
    width: 30%;
    button {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 0.5rem;
      padding: 1rem;
      background-color: #2c3e50;
      color: white;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        background-color: #34495e;
      }
    }
  }
}



</style>
