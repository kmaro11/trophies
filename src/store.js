import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from './router'
import 'firebase/firestore'
import db from '@/configFirebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        userLogout: false,
        userSignIn: false,
        pushStatus: Boolean,
        userId: '',
        games: [
            {
                name: 'Spiderman',
                type: 'spiderman'
            },
            {
                name: 'God Of War',
                type: 'godofwar'
            }
        ],
        selectedGame: [],
        createdName: false,
        usernamesFromDb: [],
        userName: '',
        filteredOption: 'all',
        allTrophies: []
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        logOutUser(state, payload) {
            state.userLogout = payload
        },
        signInUser(state, payload) {
            state.userSignIn = payload
        },
        submitTrophie(state, payload) {
            state.pushStatus = payload
        },
        signInUserId(state, payload) {
            state.userId = payload
        },
        changeGame(state, game) {
            state.selectedGame = game
        },
        createdUserName(state, payload) {
            state.createdName = payload
        },
        loginUserName(state, payload) {
            if (payload) {
                state.userName = payload

            } else {
                state.userName = ''

            }
        },
        changeUsername(state, payload) {
            console.log(payload)
            state.userName = payload
        },
        filterGame(state, option) {
            console.log(option)
            state.filteredOption = option
        },
        allUserTrophies(state, data){
            state.allTrophies = data
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
        logout({commit}) {
            firebase.auth().signOut().then(() => {
                console.log('signOut')
                commit('logOutUser', true)
                commit('signInUser', false)
            })
        },
        signUserIn({commit}, payload) {
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
        pushTrophies({commit}, {trophies, game, id}) {
            db.collection(id).doc(game).set({
                trophies: trophies
            }).then(() => {
                commit('submitTrophie', true)
            })
                .catch(error => console.log(error))
        },
        getAllTrophies({commit}, user) {
            db.collection(user).get()
                .then(data => {
                    let allData = []
                    data.forEach(item => {
                        allData.push({name: item.id, trophies: item.data().trophies})
                    })
                    commit('allUserTrophies', allData)
                })
        },
        createUserName({commit}, {id, userName}) {
            db.collection('user_Names').doc(id).set({
                user_id: id,
                user_name: userName
            }).then(() => {
                commit('createdUserName', true)
            }).catch(error => console.log(error))
        },
        getUsernames({commit}, user_id) {
            db.collection('user_Names').doc(user_id).get()
                .then(data => {
                    if (data === undefined) {
                        console.log(data.data())
                        commit('loginUserName', '')
                    } else {
                        commit('loginUserName', data.data().user_name)
                        console.log(data.data())

                    }
                }).catch(error => console.log(error))
        }

    },
    getters: {
        user(state) {
            return state.user
        },
        logoutStatus(state) {
            return state.userLogout
        },
        signInStatus(state) {
            return state.userSignIn
        },
        allGames(state) {
            return state.games
        },
        selectedGame(state) {
            return state.selectedGame
        },
        userId(state) {
            return state.userId
        },
        getAllUserNames(state) {
            return state.userName
        },
        filterOption(state) {
            return state.filteredOption
        },
        getAllUserData(state){
            return state.allTrophies
        }

    }
})
