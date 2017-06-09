<template>
  <div class="profile-card">
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="../assets/background-profile.jpg">
      </div>
      <div class="card-content">
        <small>Welcome</small>
        <span class="card-title activator grey-text text-darken-4">{{ name }}<i class="material-icons right">more_vert</i></span>
        <p>Your Total Score is: <strong>{{ score }} </strong></p>
      </div>
      <!-- <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">{{ name }}<i class="material-icons right">close</i></span>
        <p>Here is some more information about this product that is only revealed once clicked on.</p>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  created: function() {
    // this.token = window.localStorage.token;
    this.id = window.localStorage._id;
    axios.defaults.headers.common['token'] = this.token;
    this.getUser();
  },
  methods: {
    getUser: function(){
      let _self = this;
      axios.get(`http://localhost:3000/api/users/${_self.id}`)
      .then(res=>{
        _self.name = res.data.name;
        _self.score = res.data.totalScore;
      })
      .catch(err=> {console.log(err)})
    }

  },
  name: 'profile-card',
  data () {
    return {
      token: window.localStorage.token,
      name: '',
      id: '',
      score: 0
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
