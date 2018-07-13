import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import Swipe from '../components/swipe';
import SwipeItem from '../components/swipe-item';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Header',
      component: Header
    },
    {
      path: '/',
      name: 'Swipe',
      component: Swipe
    },
    {
      path: '/',
      name: 'SwipeItem',
      component: SwipeItem
    }
  ]
})
