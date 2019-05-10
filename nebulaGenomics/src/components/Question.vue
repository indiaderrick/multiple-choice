/* eslint-disable */
<template>
  <div id="question">
    <div class="collection">
      <h6 class="collection-item"><strong>INSTRUCTIONS: </strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h6>

      <div v-for="(question, questionIndex) in questions" v-bind:key="question.id" class="collection-item">

        <p class="collection-header"><h4>Theme: {{question.topic}} </h4></p><hr>

        <form @submit="checkForm">
          <p v-if="errors.length">
            <strong>Please correct the following error(s):</strong>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>
          <label for="">Full Name</label>
          <input type="text" name="" value="" v-model="name">
          <span>
            <div class="card cardSize" v-for="(answer, index) in question.answers">
              <div class="card-content">
                <img class=" responsive-img small" v-bind:src="answer.imageUrl" alt="">
              </div>
              <div class="card-action">
                {{answer.quantity}}
                <input
                :id="'radio-' + answer.text"
                :value='[index, questionIndex]'
                class="radio-custom"
                v-model="picked"
                type="radio"
                >
                <label :for=" 'radio-'+ answer.text" class="radio-custom-label"><br>{{ answer.text }}</label>
              </div>
            </div>
          </span>
          <input class="btn-large right"  type="submit" value="SUBMIT">
        </form>
      </div>
    </div>
    </div>
  </template>

<script>
import db from './firebaseInit'
import SelectYourOption from './SelectYourOption.vue'


export default {
  name: 'question',
  data () {
    return {
      questions: [],
      name: null,
      picked: null,
      errors: [],
    }
  },
  components: {
    SelectYourOption
  },
  created () {
    db.collection('questions').get().then(results => {
      results.forEach((doc) => {
        console.log(doc.data())
        const data = {
          'id': doc.id,
          'question': doc.data().questionOne,
          'answers': doc.data().answers,
          'topic': doc.data().topic
        }
        console.log(data)
        this.questions.push(data)
      })
    })
  },
  methods:{
    submitResponse: function(e){
      const answerIndex = this.picked[0]
      const questionIndex = this.picked[1]
      const answer = this.questions[questionIndex].answers[answerIndex]
      answer.quantity += 1
      db.collection('questions').where('topic', '==', this.questions[questionIndex].topic)
      .get()
      .then(results => {
        results.forEach(result => {
          result.ref.update({
            answers: this.questions[questionIndex].answers,
            question: this.questions[questionIndex].question,
            topic: this.questions[questionIndex].topic,
          })
          .then(() => {
            this.$router.push({name: 'results'})
          })
        })
      })
    },
    checkForm: function (e) {
      console.log('this is picked', this.picked)
      if (this.picked && this.name || this.picked === 0 && this.name) {
        this.submitResponse(e)
        return true;
      }
      this.errors = [];
      if (this.picked === null) {
        this.errors.push('Select an image.')
      }
      if (!this.name) {
        this.errors.push('Name required.')
      }
      e.preventDefault();
    }
 }
}
</script>

<style media="screen">
  .cardSize{
    width: 20vw;
    vertical-align: top;
    display: inline-block;
    margin: 10px;
  }

</style>
