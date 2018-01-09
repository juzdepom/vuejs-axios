import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
  },
  mutations: {

  },
  actions: {
    signUp({ commit }, authData){
      axios.post('/signupNewUser?key=AIzaSyCa23LBECfmUKFzFe5oOBDJbCabnycYPbU', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
        })
        .then(res => { console.log(res) })
        .catch(error => { console.log(error) })
    },
    signIn({ commit }, authData){
      axios.post('/verifyPassword?key=AIzaSyCa23LBECfmUKFzFe5oOBDJbCabnycYPbU', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
        })
        .then(res => { console.log(res) })
        .catch(error => { console.log("ERROR! ", error) })
    }
  },
  getters: {

  }
})
