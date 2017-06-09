<template>
  <div id="create-quiz">
    <div class="card" >
      <div class="card-content">
        <h5><strong>Create Quiz</strong></h5>
        <form>
          <div class="row">
            <div class="input-field col s12">
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
              <select ref="category" required>
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
              <select ref="dificulty" required>
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
  data : function (){
  return{
  }
  },
  methods: {
    create: function(){
      let name = this.$refs.name.value
      let date = this.$refs.date.value
      let time = this.$refs.time.value

      console.log(time);
      console.log(date);

      let gameLength = this.$refs.number.value
      let category = this.$refs.category.value
      let dificulty = this.$refs.dificulty.value

      if(name !== undifined && date !==undifined && time !==undifined && gameLength !== undifined && category !== undifined && dificulty !== undifined){
        axios.get(`https://opentdb.com/api.php?amount=${gameLength}&category=${category}&difficulty=${dificulty}&type=multiple`)
        .then(response => {
          let question = response.data.results
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
