<template lang="html">
  <nav class="navbar">
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo center">Logo</a>
      <ul class="left hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li class="active"><a href="collapsible.html">JavaScript</a></li>
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

</style>
