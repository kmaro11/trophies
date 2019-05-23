import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        userLogout: false,
        userSignIn:false,
        pushStatus: Boolean
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        logOutUser(state, payload) {
            state.userLogout = payload
        },
        signInUser(state, payload){
            state.userSignIn = payload
        },
        submitTrophie(state, payload) {
            state.pushStatus = payload
        }
    },
    actions: {
        signUserUp({commit}, payload) {
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
        logout({commit}, payload){
            firebase.auth().signOut().then( () => {
                console.log('signOut')
                commit('logOutUser', true)
                commit('signInUser', false)
            })
        },
        signUserIn({commit}, payload){
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    router.push('/')
                    commit('signInUser', true)
                }).catch(
                error => {
                    console.log(error)
                }
            )
        },
        pushTrophies({commit}, payload) {
            firebase.collection('SpidermanTrophies').add({
                user_id: 'id',
                trophie: 'new trophie'
            }).then (() => {
                console.log('pushed')
                commit('submitTrophie', payload)
            })
                .catch(error => console.log(error))
        }
    },
    getters: {
        user (state) {
            return state.user
        },
        logoutStatus (state){
            return state.userLogout
        },
        signInStatus (state) {
            return state.userSignIn
        }

    }
})
