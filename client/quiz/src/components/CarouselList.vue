<template>
  <div class="carousel-list">
    <div class="carousel">
       <a class="carousel-item" href="#one!"><img src="http://lorempixel.com/250/250/nature/1"></a>
       <a class="carousel-item" href="#two!"><img src="http://lorempixel.com/250/250/nature/2"></a>
       <a class="carousel-item" href="#three!"><img src="http://lorempixel.com/250/250/nature/3"></a>
       <a class="carousel-item" href="#four!"><img src="http://lorempixel.com/250/250/nature/4"></a>
       <a class="carousel-item" href="#five!"><img src="http://lorempixel.com/250/250/nature/5"></a>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  name: 'carousel-list',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
