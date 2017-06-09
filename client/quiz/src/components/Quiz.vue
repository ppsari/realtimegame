<template>
<div id="quiz">
  <div class="card" >
    <div v-for="(quiz, index) in quizez" v-show="index === questionindex">
      <div class="card-image">
        <div class="image-wrapper">
          <img src="https://unsplash.it/300/200/?random">
        </div>
        <span class="card-title category"><small>{{ quiz.category }}</small></span>
        <span class="card-title"><strong>{{ quiz.question }}</strong></span>
      </div>
      <div class="card-content">
        <ol>
          <!--display the quiz options -->
          <li v-for="answer in quiz.incorrect_answers">
            <label>
              <!-- bind the options to the array index of the answers array that matches this index -->
              <p>
                <input class="with-gap" name="answer" type="radio" :id="answer" v-model="answers[index]" :value="answer" />
                <label :for="answer">{{answer}}</label>
              </p>
              <!-- <input type="radio" name="answer" v-model="answers[index]" :value="answer"> {{answer}} -->
            </label>
          </li>
        </ol>
      </div>
    </div>
    <div class="card-action">
      <div v-if="questionindex < quizez.length">
        <!-- display only if the question index is greater than zero -->
        <!-- onclick of this button, call the previous function, and show last question -->
        <button class="btn waves-effect waves-teal" v-if="questionindex > 0" v-on:click="prev">
          prev
        </button>
        <!-- onclick of this button, call the next function, and show next question -->
        <button class="btn waves-effect waves-teal" v-on:click="next">
          next
        </button>
      </div>
    </div>
  </div>

  <!-- show total score, if the questions are completed -->
  <span v-if="questionindex == quizez.length">Your Total score is {{score}} / {{quizez.length}}</span>
</div>
</template>

<script>
// an array of questions to be asked. Length of 10 questions.
var quiz_questions = [
  {
  "category": "Entertainment: Film",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Who directed 'E.T. the Extra-Terrestrial' (1982)?",
  "correct_answer": "Steven Spielberg",
  "incorrect_answers": [
  "Steven Spielberg",
  "Stanley Kubrick",
  "James Cameron",
  "Tim Burton"
  ]
  },
  {
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "medium",
  "question": "What is the main character of Metal Gear Solid 2?",
  "correct_answer": "Raiden",
  "incorrect_answers": [
  "Raiden",
  "Solidus Snake",
  "Big Boss",
  "Venom Snake"
  ]
  },
  {
  "category": "Science & Nature",
  "type": "multiple",
  "difficulty": "easy",
  "question": "What is the hottest planet in the Solar System?",
  "correct_answer": "Venus",
  "incorrect_answers": [
  "Venus",
  "Mars",
  "Mercury",
  "Jupiter"
  ]
  },
  {
  "category": "Entertainment: Books",
  "type": "multiple",
  "difficulty": "hard",
  "question": "What is Ron Weasley's middle name?",
  "correct_answer": "Bilius",
  "incorrect_answers": [
  "Bilius",
  "Arthur",
  "John",
  "Dominic"
  ]
  },
  {
  "category": "Politics",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Before 2011, 'True Capitalist Radio' was known by a different name. What was that name?",
  "correct_answer": "True Conservative Radio",
  "incorrect_answers": [
  "True Conservative Radio",
  "True Republican Radio",
  "Texan Capitalist Radio",
  "United Capitalists"
  ]
  },
  {
  "category": "Entertainment: Film",
  "type": "multiple",
  "difficulty": "medium",
  "question": "This movie contains the quote, 'I love the smell of napalm in the morning!'",
  "correct_answer": "Apocalypse Now",
  "incorrect_answers": [
  "Apocalypse Now",
  "Platoon",
  "The Deer Hunter",
  "Full Metal Jacket"
  ]
  },
  {
  "category": "History",
  "type": "multiple",
  "difficulty": "medium",
  "question": "The Herero genocide was perpetrated in Africa by which of the following colonial nations?",
  "correct_answer": "Germany",
  "incorrect_answers": [
  "Germany",
  "Britain",
  "Belgium",
  "France"
  ]
  },
  {
  "category": "Entertainment: Music",
  "type": "boolean",
  "difficulty": "medium",
  "question": "Ashley Frangipane performs under the stage name Halsey.",
  "correct_answer": "True",
  "incorrect_answers": [
  "True",
  "False"
  ]
  },
  {
  "category": "Entertainment: Books",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Under what pseudonym did Stephen King publish five novels between 1977 and 1984?",
  "correct_answer": "Richard Bachman",
  "incorrect_answers": [
  "Richard Bachman",
  "J. D. Robb",
  "Mark Twain",
  "Lewis Carroll"
  ]
  },
  {
  "category": "History",
  "type": "multiple",
  "difficulty": "medium",
  "question": "In what prison was Adolf Hitler held in 1924?",
  "correct_answer": "Landsberg Prison",
  "incorrect_answers": [
  "Landsberg Prison",
  "Spandau Prison",
  "Ebrach Abbey",
  "Hohenasperg"
  ]
  }
]
export default {
//name of the component
  name: 'quiz',
  //function that returns data to the components
  data : function (){
  return{
//question index, used to show the current question
  questionindex:0,
//set the variable quizez to the questions defined earlier
  quizez:quiz_questions,
//create an array of the length of the questions, and assign them to an empty value.
answers:Array(quiz_questions.length).fill(''),
  }
  },
  //methods to be called in the component
  methods: {
  // Go to next question
  next: function() {
  this.questionindex++;
  },
  // Go to previous question
  prev: function() {
  this.questionindex--;
  }
 },
 computed:{
 //calculate total score of the quiz person.
  score: function() {
  var total = 0;
  for (var i =0; i <this.answers.length; i++) {
  if(this.answers[i]==this.quizez[i].correct_answer){
  total +=1;
  }
  }
  return total;
  }
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
