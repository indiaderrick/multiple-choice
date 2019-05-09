<template>
  <div id="question">
    <h3>Question</h3>
    <div class="action-btn">
      <router-link to="/results" class="waves-effect waves-light btn-large">
      <i class="material-icons right">View What Others Said</i></router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'question',
  data () {
    return {
      questions: []
    }
  },
  created() {
    db.collection('questions').get().then
    (results => {
      results.forEach(doc => {
        console.log(doc)
        const data = {

        }
      })
    })
  }
}

</script>
