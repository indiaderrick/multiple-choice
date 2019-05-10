/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Question from '@/components/Question'
import ResultNameList from '@/components/ResultNameList'
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
      path: '/results',
      name: 'Results',
      component: Results
    },
    {
      path: '/answer',
      name: 'ResultNameList',
      component: ResultNameList
    }
  ]
})
