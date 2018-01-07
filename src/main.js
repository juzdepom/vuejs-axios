import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from './store'

axios.defaults.baseURL = "https://vuejs-axios-7909e.firebaseio.com"

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
