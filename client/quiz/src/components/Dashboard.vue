<template>
  <div class="dashboard">
    <Navbar></Navbar>
    <div class="container page">
      <div class="row">
        <div class="col m4">
          <h5><strong>Your Profile</strong></h5>
          <ProfileCard></ProfileCard>
          <HistoryQuiz></HistoryQuiz>
        </div>
        <div class="col s12 m8">
          <h5><strong>Available Quiz</strong></h5>
          <AvailableQuiz></AvailableQuiz>
        </div>
      </div>
    </div>
    <PageFooter></PageFooter>
  </div>
</template>

<script>
import CarouselList from './CarouselList'
import Navbar from './Navbar'
import PageFooter from './PageFooter'
import AvailableQuiz from './AvailableQuiz'
import ProfileCard from './ProfileCard'
import HistoryQuiz from './HistoryQuiz'
export default {
  components: {
    CarouselList,
    Navbar,
    PageFooter,
    AvailableQuiz,
    ProfileCard,
    HistoryQuiz
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
