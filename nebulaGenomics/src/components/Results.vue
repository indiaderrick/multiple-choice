<template>
  <div id="results">
    <h3>Results</h3>
    <div class="action-btn">
      <router-link to="/" class="waves-effect waves-light btn-large">
      <i class="material-icons right"></i>Back to Photos</router-link>
    </div>
    <li v-for="answer in questions[0].answers" v-bind:key="question.id" class="collection-item">
      
      <p><span class="chip">{{answer.text}}: {{answer.quantity}}</span> </p>
    </li>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'results',
  data () {
    return {
      questions: []
    }
  },
  created () {
    db.collection('questions').get().then(results => {
      results.forEach((doc) => {
        console.log(doc.data());
        const data = {
          'id': doc.id,
          'question': doc.data().questionOne,
          'answer1': doc.data().answer1,
          'answer2': doc.data().answer2,
          'answer3': doc.data().answer3
        }
        console.log(data);
        this.questions.push(data)
      })
    })
  }
}

</script>
