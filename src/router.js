import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Trophies from '@/components/trophies'
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
import Profile from '@/components/Profile.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/trophies',
            name: 'trophies',
            component: Trophies
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/sign-in',
            name: 'signIn',
            component: SignIn
        },
        {
            path: '/sign-up',
            name: 'signUp',
            component: SignUp
        },


    ],
    mode: 'history'
})
