<template>
  <div class="Layout">
    <nav class="navbar"></nav>
    <main class="main">
      <div class="menu"></div>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.Layout {
  .navbar {
    height: 55px;
    background-color: aqua;
  }
  .main {
    height: 20vh;
    display: flex;
    .menu {
      width: 300px;
      height: 100%;
      background-color: pink;
    }
    .container {
      background-color: orange;
      flex: 1;
    }
  }
}
</style>