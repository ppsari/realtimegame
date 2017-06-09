<template>
  <div class="playground">
    <div class="container">
      <div class="row">
        <div class="col s12 m6 offset-m3">
          <Quiz></Quiz>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quiz from './Quiz'
export default {
  components: {
    Quiz
  },
  name: 'playground',
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
