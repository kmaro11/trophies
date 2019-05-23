import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import trophies from './trophies'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  trophies,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyD5eZ_DTXy9Gktq5zHPz4dRwZJZXFQDP1s",
      authDomain: "trophies-2e6a7.firebaseapp.com",
      databaseURL: "https://trophies-2e6a7.firebaseio.com",
      projectId: "trophies-2e6a7",
      storageBucket: "trophies-2e6a7.appspot.com",
      // messagingSenderId: "432865278883",
      // appId: "1:432865278883:web:887c8cf1dc8b89f5"
    })
  }
}).$mount('#app')
