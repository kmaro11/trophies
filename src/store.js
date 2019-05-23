import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from './router'
import 'firebase/firestore'
import db  from '@/configFirebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userLogout: false,
    userSignIn: false,
    pushStatus: Boolean,
    dbData: [],
    userId: ''

  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    logOutUser (state, payload) {
      state.userLogout = payload
    },
    signInUser (state, payload) {
      state.userSignIn = payload
    },
    submitTrophie (state, payload) {
      state.pushStatus = payload
    },
    retrivedData (state, payload) {
      state.dbData = payload
    },
    signInUserId (state, payload){
      state.userId = payload
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
            const newUser = {
              id: user.user.uid,
            }
            commit('setUser', newUser)
          }
        ).catch(
        error => {
          console.log(error)
        }
      )
    },
    logout ({commit}) {
      firebase.auth().signOut().then(() => {
        console.log('signOut')
        commit('logOutUser', true)
        commit('signInUser', false)
      })
    },
    signUserIn ({commit}, payload) {
      console.log(commit('signInUserId', payload))
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          router.push('/')
          commit('signInUser', true)
          commit('signInUserId', data.user.uid)
        }).catch(
        error => {
          console.log(error)
        }
      )
    },
    pushTrophies ({commit}, payload) {
      db.collection('SpidermanGame').doc().set({
        user_id: 'blach',
        trophies: payload
      }).then(() => {
        commit('submitTrophie', payload)
      })
        .catch(error => console.log(error))
    },
    getTrophies ({commit}){
      db.collection('SpidermanGame').doc('Trophies').get()
          .then(data => {
            let dbData = data.data().trophies
            commit('retrivedData', dbData)

          })
    }

  },
  getters: {
    user (state) {
      return state.user
    },
    logoutStatus (state) {
      return state.userLogout
    },
    signInStatus (state) {
      return state.userSignIn
    },
    dataFromDb (state) {
      return state.dbData
    },

  }
})
