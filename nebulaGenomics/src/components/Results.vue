<template>
  <div id="results">
    <div class="collection resultsContainer">
      <div class="collection-header">
        <h3>Thanks for your vote, {{this.name}}. Here are the results:</h3>
        <router-link to="/" class="waves-effect btn black">
          <i class="material-icons"></i>Back to Photos</router-link>
        </div>
      <div class="photoRow collection-item">
        <div v-for="answer in questions[0].answers" v-bind:key="answer.text" class="card card-results">
          <img id="photo" class="responsive-img small" v-bind:src="answer.imageUrl" alt="photo">
          <div class="card-action">
            <b v-if="!answer.quantity"> No votes yet :(</b>
            <b v-else-if="answer.text === yourVote">You and {{answer.quantity - 1}} other(s) ---- <i> SCROLL ↯ </i></b>
            <b v-else="answer.quantity"> {{answer.quantity}} Vote(s) ---- <i> SCROLL ↯ </i></b>
          </div>
          <div class="card-action">
            <span v-for="(name, index) in answer.chosenBy">
              <p class="chip" v-if="index">{{name}}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'results',
  data () {
    return {
      name: this.$route.params.name,
      yourVote: this.$route.params.vote,
      questions: []

    }
  },
  created () {
    db.collection('questions').get().then(results => {
      results.forEach((doc) => {
        const data = {
          'id': doc.id,
          'question': doc.data().questionOne,
          'answers': doc.data().answers,
          'topic': doc.data().topic,
        }
        this.questions.push(data)
      })
    })
  }
}
</script>

<style media="screen">
.resultsContainer{
  position: relative;
  padding: 35px;
}
.card-results{
  width: 20vw;
  height: 64vh;
  overflow: scroll;
  vertical-align: top;
  display: inline-block;
  margin: 6px;
}
</style>
