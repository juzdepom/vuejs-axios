import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from './store'

axios.defaults.baseURL = "https://vuejs-axios-7909e.firebaseio.com"
axios.defaults.headers.get['Accepts'] = 'application/json'

// const reqInt = axios.interceptors.request.use(config => {
//   console.log('request: ' + JSON.stringify(config, null, 2))
//   return config
// })
// const respInt = axios.interceptors.response.use(res => {
//   console.log('response: ' + JSON.stringify(res, null, 2))
//   return res
// })
//
// axios.interceptors.request.eject(reqInt)
// axios.interceptors.response.eject(respInt)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
