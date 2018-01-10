import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, userData ) {
      state.user = userData
    }
  },
  actions: {
    signUp({ commit, dispatch }, formData){
      axios.post('/signupNewUser?key=AIzaSyCa23LBECfmUKFzFe5oOBDJbCabnycYPbU', {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true,
        })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId,
          })
        })
        .catch(error => { console.log(error) })
        dispatch('storeUser', formData )
    },
    storeUser({ commit, state }, userData){
      if(!state.idToken){
        return
      }
      globalAxios.post('/users.json' + "?auth=" + state.idToken, userData)
        .then(res => console.log(response))
        .catch(error => console.log('ERROR! ', error))
    },
    signIn({ commit }, authData){
      axios.post('/verifyPassword?key=AIzaSyCa23LBECfmUKFzFe5oOBDJbCabnycYPbU', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
        })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId,
          })
        })
        .catch(error => { console.log("ERROR! ", error) })
    },
    fetchUser({ commit, state }){
        if(!state.idToken){
          console.log('no id token')
          return
        }
        globalAxios.get('/users.json' + "?auth=" + state.idToken)
        .then(res => {
          console.log(res.data)
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          commit('storeUser', users[0])
        })
        .catch(error => {console.log(error)})
    }
  },
  getters: {
    user (state) {
      return state.user;
    }
  }
})
