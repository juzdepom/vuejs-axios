import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
  },
  mutations: {
    authUser( state, userData ) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser( state, userData ) {
      state.user = userData
    },
    clearAuthData( state ){
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    setLogoutTimer({ commit, dispatch }, expirationTime){
      setTimeout(() => {
        dispatch('logout')
      }, expirationTime * 1000 )
    },
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
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('storeUser', formData )
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => { console.log(error) })

    },
    storeUser({ commit, state }, userData){
      if(!state.idToken){
        return
      }
      globalAxios.post('/users.json' + "?auth=" + state.idToken, userData)
        .then(res => console.log(response))
        .catch(error => console.log('ERROR! ', error))
    },
    tryAutoLogin({ commit }){
      const token = localStorage.getItem('token')
      if(!token){
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
      router.replace('/dashboard')

    },
    logout({ commit }){
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('userId')
      localStorage.removeItem('expiresIn')
      router.replace('/signin')
    },
    signIn({ commit, dispatch }, authData){
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
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('setLogoutTimer', res.data.expiresIn)
          dispatch('fetchUser')
          console.log('moving to dashboard')
          router.replace('/dashboard')
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
    user(state) {
      return state.user;
    },
    isAuthenticated(state){
      return state.idToken != null
    }
  }
})
