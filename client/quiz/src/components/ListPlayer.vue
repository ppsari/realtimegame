<template>
  <div class="list-player">
    <h6><strong>Active Player</strong></h6>
    <ul class="collection">
      <li class="collection-item avatar">
        <img src="../assets/avatar.png" alt="" class="circle">
        <span class="title">John Doe</span>
        <p><small>Total Score: <strong>640</strong></small></p>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  components: {
  },
  name: 'list-player',
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
