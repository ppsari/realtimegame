<template>
  <div class="history-quiz">
    <h6><strong>My Game History</strong></h6>
    <ul class="collection">
      <li class="collection-item avatar" v-for="gl in gameList">
        <img src="../assets/avatar.png" alt="" class="circle">
        <span class="title">{{ gl['game_id'].name || '' }}</span>
        <p><small>Score: <strong>{{gl.score }}
      </strong></small></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
  },
  created: function() {
    this.id = window.localStorage._id;
    axios.defaults.headers.common['token'] = this.token;
    this.getUser();
  },
  methods: {
    getUser: function(){
      let _self = this;
      axios.get(`http://localhost:3000/api/users/${_self.id}`)
      .then(res =>{
        _self.gameList = res.data.gameList;
        console.log(_self.gameList)
      })
    .catch(err=> {console.log(err)})
    }

  },
  name: 'history-quiz',
  data () {
    return {
      gameList : [],
      id: window.localStorage._id
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
