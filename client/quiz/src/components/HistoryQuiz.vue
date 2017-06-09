<template>
  <div class="history-quiz">
    <h6><strong>My Game History</strong></h6>
    <ul class="collection">
      <li class="collection-item avatar">
        <img src="../assets/avatar.png" alt="" class="circle">
        <span class="title">Quiz Hacktiv - Film</span>
        <p><small>Score: <strong>8</strong></small></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
  },
  name: 'history-quiz',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .collection .collection-item.avatar {
    min-height: 70px;
  }
</style>
