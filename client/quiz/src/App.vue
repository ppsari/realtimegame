<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: {

  },
  methods: {

  }
}

  //localstorage
</script>
<style>
  #app {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
  }
  .page {
    min-height: 81.8vh;
  }
  strong{
    font-weight: 700;
  }
</style>
