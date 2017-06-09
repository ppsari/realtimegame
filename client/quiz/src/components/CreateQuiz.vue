<template>
  <div id="create-quiz">
    <div class="quizList">
      <table class="bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Difficulty</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gm in games" :id="gm._id" :category="gm.category" :name="gm.name" :difficulty="gm.difficulty" :date="gm.time" :number="gm.question">
            <td>{{ gm.name }}</td>
            <td>{{ gm.time }}</td>
            <td>{{ gm.difficulty }}</td>
            <td>{{ gm.category }}</td>
            <td><i class="material-icon" @click="editGame(gm._id)">edit</i><i class="material-icon" @click="deleteGame(gm._id)">delete</i></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card" >
      <div class="card-content">
        <h5><strong>Create Quiz</strong></h5>
        <form>
          <div class="row">
            <div class="input-field col s12">
              <input id="_id" ref="_id" type="hidden">
              <input id="NameQuiz" ref="name" type="text" class="validate" data-length="10" required>
              <label for="NameQuiz">Enter Quiz Name</label>
            </div>
            <div class="input-field col s12">
              <input id="time" type="date" ref="date" class="datepicker" required>
              <label for="time">Set Game Date</label>
            </div>
            <div class="input-field col s12">
              <input id="timepicker_ampm_dark" ref="time" class="timepicker" type="time">
              <label for="timepicker_ampm_dark">Time am/pm ( dark theme )</label>
            </div>
            <div class="input-field col s12">
              <input id="number" type="number" ref="number" class="validate" required>
              <label for="number">Number of Question</label>
            </div>
            <div class="input-field col s12">
              <select ref="category" required id="category">
                <option value="any">Any Category</option>
        				<option value="9">General Knowledge</option>
        				<option value="10">Entertainment: Books</option>
        				<option value="11">Entertainment: Film</option>
        				<option value="12">Entertainment: Music</option>
        				<option value="13">Entertainment: Musicals &amp; Theatres</option>
        				<option value="14">Entertainment: Television</option>
        				<option value="15">Entertainment: Video Games</option>
        				<option value="16">Entertainment: Board Games</option>
        				<option value="17">Science &amp; Nature</option>
        				<option value="18">Science: Computers</option>
        				<option value="19">Science: Mathematics</option>
        				<option value="20">Mythology</option>
        				<option value="21">Sports</option>
        				<option value="22">Geography</option>
        				<option value="23">History</option>
        				<option value="24">Politics</option>
        				<option value="25">Art</option>
        				<option value="26">Celebrities</option>
        				<option value="27">Animals</option>
        				<option value="28">Vehicles</option>
        				<option value="29">Entertainment: Comics</option>
        				<option value="30">Science: Gadgets</option>
        				<option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        				<option value="32">Entertainment: Cartoon &amp; Animations</option>
              </select>
              <label></label>
            </div>
            <div class="input-field col s12">
              <select ref="dificulty" required id="dificulty">
                <option value="" disabled selected>Select Dificulty</option>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
              <label></label>
            </div>
          </div>
          <div class="row">
            <div class="col s12 center-align">
              <button class="waves-effect waves-light btn" v-on:click="create">Create Quiz</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>

export default {
//name of the component
  name: 'create-quiz',
  //function that returns data to the components
  data (){
    return {
      games : []
    }
  },
  created: function() {
    let token = window.localStorage.token;
    axios.defaults.headers.common['token'] = token;
    // console.log('created');
    // console.log(this.games);
    this.getGames();
  },
  methods: {
    getGames: function() {
      let _self = this;
      axios.get(`http://localhost:3000/api/games/`)
      .then((res)=>{
        _self.games = res.data;
      })
      .catch(err=> {console.log(err)})
    },
    editGame: function(id) {
      // console.log(id+'____id')
      let tr = document.getElementById(`${id}`);
      document.getElementById('_id').value = `${id}`;
      let arrDate = tr.getAttribute('date').split('T');
      // console.log(arrDate)
      if(arrDate.length > 0) {
        document.getElementById('timepicker_ampm_dark').value = arrDate[1];
        document.getElementById('time').value = arrDate[0];

        console.log(arrDate)
      }
      document.getElementById('NameQuiz').value = tr.getAttribute('name');
      $("#category").val(tr.getAttribute('category')).material_select()
      $("#dificulty").val(tr.getAttribute('difficulty')).material_select()
      document.getElementById('number').value = tr.getAttribute('number');

    },
    deleteGame: function(id){
      let _self = this;
      axios.defaults.headers.common['token'] = window.localStorage.token;

      axios.delete(`http://localhost:3000/api/games/${id}`)
      .then((res)=>{
        _self.getGames();
      })
      .catch(err=> {console.log(err)})
    },
    create: function(){
      let name = this.$refs.name.value
      let date = this.$refs.date.value
      let time = this.$refs.time.value

      time = new Date(`${date} ${time}`).toISOString()

      // console.log(time);
      console.log(date);

      let gameLength = this.$refs.number.value
      let category = this.$refs.category.value
      let dificulty = this.$refs.dificulty.value

      axios.defaults.headers.common = {Accept: "application/json, text/plain, */*"}
      if( typeof name !== 'undefined' &&  typeof date !=='undefined' &&  typeof time !=='undefined' &&  typeof gameLength !== 'undefined' &&  typeof category !== 'undefined' &&  typeof dificulty !== 'undefined'){
        axios.get(`https://opentdb.com/api.php?amount=${gameLength}&category=${category}&difficulty=${dificulty}&type=multiple`)
        .then(response => {

          axios.defaults.headers.common['token'] = localStorage.token;
          let token = window.localStorage.token || '';
          if (response.data.hasOwnProperty('results')) {
            let question = response.data.results
            let rnd;
            question = question.map((quest)=>{
              rnd = Math.floor(Math.random()*4 + 0);
              quest.incorrect_answers.splice(rnd,0,quest.correct_answer);
              return quest;
            });

            let game = {
              name: name,
              time: time,
              difficulty:dificulty,
              category:category,
              question:question
            }

            let _self = this;
            let _id = document.getElementById('_id').value;
            if (_id.value !== '') {
              axios.put(`http://localhost:3000/api/games/${_id}`,game)
              .then((res)=>{

                console.log(res.data);
                _self.getGames();
                $('input').val('');
                $('select').val('').material_select();
              })
              .catch(err=> {console.log(err)})
              _id.value = '';
              console.log('edit data');
            } else {
              _id.value = '';
              axios.post('http://localhost:3000/api/games',game)
              .then((res)=>{
                console.log(res.data);
                _self.getGames();
              })
              .catch(err=> {console.log(err)})
              console.log('save data');
            }

          }

          // console.log(question)

          // axios.post(tolong lanjutin pop)
        })
        .catch(err => console.log(err))
      }

    }
  },
 computed:{
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  li {
    display: block;
    margin: 0 10px;
  }

  ol {
    padding: 0;
    text-align: left;
  }

  a {
    color: #42b983;
  }

  .category {
    position: absolute;
    top: -15px;
  }

  .card-action {
    text-align: center;
  }

  .image-wrapper {
    background-color: black;
  }
  .image-wrapper img {
    opacity: .5;
  }
</style>
