<template>
  <div class="playground">
    <div class="container">
      <div class="row">
        <div class="col s12 m6">
          <Quiz></Quiz>
        </div>
        <div class="col m4">
          <ListPlayer></ListPlayer>
          <LiveComment></LiveComment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quiz from './Quiz'
import ListPlayer from './ListPlayer'
import LiveComment from './LiveComment'
export default {
  components: {
    Quiz,
    ListPlayer,
    LiveComment
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
