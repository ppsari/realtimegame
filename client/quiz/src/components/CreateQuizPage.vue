<template>
  <div class="create-quiz-page">
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
        <div class="col s12 m6">
          <h1 class="title">Create<br>Quiz</h1>
        </div>
        <div class="col s12 m6">
          <CreateQuiz></CreateQuiz>
        </div>
      </div>
    </div>
    <PageFooter></PageFooter>
  </div>
</template>

<script>
import CreateQuiz from './CreateQuiz'
import Navbar from './Navbar'
import PageFooter from './PageFooter'
export default {
  components: {
    CreateQuiz,
    Navbar,
    PageFooter
  },
  name: 'create-quiz-page',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .create-quiz-page {
    background-image: url('../assets/background33.jpg');
    background-size: cover;
    background-position: bottom center;
  }
  h1, h2 {
    font-weight: normal;
  }
  h1.title {
    font-weight: 800;
    text-align: right;
    color: teal;
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
