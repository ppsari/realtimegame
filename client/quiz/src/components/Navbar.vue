<template lang="html">
  <nav class="navbar teal">
    <div class="nav-wrapper container">
      <a href="#!" class="brand-logo center">Hactiv Quiz</a>
      <ul class="left hide-on-med-and-down">
        <li><a href="./#/dashboard">Dashboard</a></li>
        <li><a href="./#/create-quiz">Create Quiz</a></li>
        <li><a href="#">My Account</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        menu: ""
      }
    }
  }
</script>


<style lang="css" scoped>
nav .brand-logo {
  position: absolute;
  color: #fff;
  display: inline-block;
  font-size: 1.5em;
  padding: 0;
  white-space: nowrap;
  font-weight: 700;
}
</style>
