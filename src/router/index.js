import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend'
import Singer from '@/components/singer/singer'
import Search from '@/components/search/search'
import Rank from '@/components/rank/rank'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    }

  ]
})
