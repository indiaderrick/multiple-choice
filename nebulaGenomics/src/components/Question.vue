/* eslint-disable */
<template>
  <div id="question">
    <div class="collection">
      <div v-for="(question, questionIndex) in questions" v-bind:key="question.id" class="collection-item">
        <h3 class="collection-header">Hello, </h3><hr>
        <form @submit.prevent="checkForm">
          <p v-if="errors.length">
            <b class="errors">Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>
          <label for="name">What's your name?</label>
          <input type="text" name="name" value="" v-model="name">
          <div>
            <label>Which is your favourite photo?</label>
          </div>

          <div class="card cardSize" v-for="(answer, index) in question.answers">
            <img id="photo" class="responsive-img small" v-bind:src="answer.imageUrl" alt="">
            <div class="card-content">
            </div>
            <div class="card-action">
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
          <div class="collection-item">
            <input class="btn black right"  type="submit" value="VOTE >">
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
// import PhotoComponent from './PhotoComponent.vue'

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
    // PhotoComponent
  },
  created () {
    db.collection('questions').get().then(results => {
      results.forEach((doc) => {
        const data = {
          'id': doc.id,
          'question': doc.data().questionOne,
          'answers': doc.data().answers,
          'topic': doc.data().topic
        }
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
      answer.chosenBy.push(this.name)
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
            this.$router.push({name: 'Results', params: {name: this.name, vote: answer.text}})
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
      this.errors = []
      if (!this.name) {
        this.errors.push('Name not provided.')
      }
      if (this.picked === null) {
        this.errors.push('No photo selected.')
      }
      e.preventDefault();
    }
 }
}
</script>

<style media="screen">
  .collection{
    padding: 30px;
  }
  .errors{
    color: red;
  }
  .cardSize{
    width: 18vw;
    vertical-align: top;
    display: inline-block;
    margin: 10px;
  }
</style>
