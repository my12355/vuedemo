import Vue from 'vue';
import { Swipe, SwipeItem } from './components/main';
import App from './App';
import VueRes from 'vue-resource';
import axios from 'axios';
import { Button } from 'mint-ui';
import 'mint-ui/lib/style.css';
import router from "./router/index.js";
import ElementUI from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vuex from 'vuex'
Vue.use(Vuex)
// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

import 'element-ui/lib/theme-chalk/index.css';
import Calendar from 'vue2-datepick';
Vue.use(Calendar);
import Form_1 from './components/form_1.vue';
import Home from './components/home.vue';
Vue.prototype.$http = axios;
Vue.use(VueRes);
Vue.use(ElementUI)

Vue.component(Button.name, Button)
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);




const vm = new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App },
});
