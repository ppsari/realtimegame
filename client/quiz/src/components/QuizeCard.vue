<template>
  <div class="quiz-card">
    <div class="card horizontal">
      <div class="card-image">
        <h1 class="center-align"><strong>24</strong></h1>
        <p class="center-align date"><small>October 2017</small></p>
        <p class="center-align time"><small>Start At: 11:20 AM</small></p>
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <h5><strong>Quiz Hacktiv - Film</strong></h5>
          <p><small>Entertainment: Music</small></p>
        </div>
        <div class="card-action">
          <a href="#"><small>Join This Quiz</small></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  name: 'quiz-card',
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
  margin-bottom: 0;
}
.card-image {
  min-width: 120px;
  border-right: #c5c5c5 1px solid;
}
p.date{
  margin-top: 0;
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

p.time {
  margin: 0;
  padding: 12px;
  background-color: #c5c5c5;
  color: white;
  font-weight: bold;
}
</style>
