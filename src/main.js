import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import trophies from './trophies'



new Vue({
  router,
  store,
  trophies,
  render: h => h(App),

}).$mount('#app')
