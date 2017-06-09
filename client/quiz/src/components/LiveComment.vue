<template>
  <div class="live-comment">
    <div class="card-panel grey lighten-5 z-depth-1">
      <div class="row valign-wrapper">
        <div class="col s12">
          <h6>John Doe</h6>
          <span class="black-text">
            This is a square image. Add the "circle" class to it to make it appear circular.
          </span>
        </div>
      </div>
      <form class="row">
        <div class="input-field col s12">
          <input id="comment" type="text" ref="comment" required>
          <label for="comment">Comment Here</label>
        </div>
        <button class="waves-effect waves-light btn" >Comment Here</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  name: 'live-comment',
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
