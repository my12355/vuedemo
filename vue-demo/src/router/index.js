import Vue from 'vue';
import Router from 'vue-router';

import Form_1 from '../components/form_1.vue';
import Home from '../components/home.vue';
import goods from '../components/goods.vue';
import good_detail from '../components/good_detail.vue';
import Footer_ui from '../components/footer_ui.vue';
import pull from '../components/pull-refresh-parent';

Vue.use(Router);
import flexible from "../flexible.js";
Vue.use(flexible)

export default new Router({
  mode:"history",
  routes: [

    {
      path: '/',
      name:"/Home",
      // component: Home,


    },
    {
      path: '/Form_1',
      name:"Form_1",
      component: Form_1
    },
    {
      // path: '/goods',
      // name:"goods",
      // component: goods,
      // children: [
      //   {
          path: '/good_detail/:name',
          component: good_detail,
      //   }
      // ]
    }









  ]
})
