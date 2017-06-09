<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col s12 m6 offset-m6">
          <CreateQuiz></CreateQuiz>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarouselList from './CarouselList'
import CreateQuiz from './CreateQuiz'
export default {
  components: {
    CarouselList,
    CreateQuiz
  },
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
