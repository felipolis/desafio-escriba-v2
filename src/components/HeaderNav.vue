<script setup></script>

<template>
  <main class="header-container">
    <!-- LOGO -->
    <div class="img-container">
      <img src="../assets/logo.png" alt="" />
    </div>
    <!-- LOGO -->

    <!-- NAV -->
    <div class="nav-links">
      <router-link to="/pessoas" active-class="active" exact>
        <i class="fa-regular fa-user"></i>
        <span>Pessoas</span>
      </router-link>
      <router-link to="/produtos" active-class="active" exact>
        <i class="fa-solid fa-tag"></i>
        <span>Produtos</span>
      </router-link>
      <router-link to="/pedidos" active-class="active" exact>
        <i class="fa-brands fa-shopify"></i>
        <span>Pedidos</span>
      </router-link>
    </div>
    <!-- NAV -->
  </main>
</template>

<style lang="scss" scoped>
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30%;
  width: 100%;
  background-color: white;
  padding: 1rem;

  .img-container {
    //width: 90%;

    img {
      width: 100%;
    }
  }

  .nav-links {
    width: 100%;
    list-style: none;
    padding: 0;
    margin-top: 2rem;
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;

    a {
      text-decoration: none;
      color: rgb(63, 63, 63);
      padding: 1rem;
      border-radius: 1rem;
      cursor: pointer;
      transition: 0.3s;
      display: flex;
      align-items: center;
      gap: 1rem;

      &.active {
        background-color: #e0e0e0;
      }

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
