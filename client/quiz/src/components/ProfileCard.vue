<template>
  <div class="profile-card">
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="../assets/background-profile.jpg">
      </div>
      <div class="card-content">
        <small>Welcome</small>
        <span class="card-title activator grey-text text-darken-4">John Doe<i class="material-icons right">more_vert</i></span>
        <p>Your Total Score is: <strong>460</strong></p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
        <p>Here is some more information about this product that is only revealed once clicked on.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  name: 'profile-card',
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
    max-height: 130px;
}
</style>
