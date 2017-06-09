<template>
  <div id="create-quiz">
    <div class="card" >
      <div class="card-content">
        <form>
        <div class="row">
          <div class="input-field col s12">
            <input id="NameQuiz" type="text" class="validate" data-length="10" required>
            <label for="NameQuiz">Enter Quiz Name</label>
          </div>
          <div class="input-field col s12">
            <input id="time" type="date" class="datepicker" required>
            <label for="time">Set Game Time</label>
          </div>
          <div class="input-field col s12">
            <input id="number" type="number" class="validate" required>
            <label for="number">Number of Question</label>
          </div>
          <div class="input-field col s12">
            <select>
              <option value="" disabled selected>Select Category</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <label></label>
          </div>
          <div class="input-field col s12">
            <select>
              <option value="" disabled selected>Select Dificulty</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
            <label></label>
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
