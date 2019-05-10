/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Question from '@/components/Question'
import Results from '@/components/Results'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Question',
      component: Question
    },
    {
      path: '/results/:name/:vote',
      name: 'Results',
      component: Results
    }
  ]
})
