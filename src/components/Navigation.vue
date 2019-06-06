<template>
    <nav class="h-20 flex justify-end w-full items-center pl-12 pr-12 w-4/5 background-dark-blue fixed z-50">
        <div class="flex">
            <router-link router to="/"
                         class="flex items-center p-4 font-bold text-white hover:text-yellow">
                Home
            </router-link>
            <router-link router to="/trophies"
                         v-if="userSignIn"
                         class="flex items-center p-4 font-bold text-white hover:text-yellow">
                Trophies
            </router-link>
            <router-link router to="/sign-up"
                         v-if="!userSignIn"
                         class="flex items-center p-4 font-bold text-white hover:text-yellow">
                Sign up
            </router-link>
            <router-link router to="/sign-in"
                         v-if="!userSignIn"
                         class="flex items-center p-4 font-bold text-white hover:text-yellow">
                Sign in
            </router-link>
        </div>
        <button @click.prevent="logout()" v-if="userSignIn" class=" p-4 font-bold text-white hover:text-yellow">

            Logout
        </button>
    </nav>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                // menu: [
                //     {
                //         name: 'Home',
                //         link: '',
                //         type: 'menu',
                //         show: true
                //     },
                //     {
                //         name: 'Trophies',
                //         link: '/trophies',
                //         type: 'trophies',
                //         show: true
                //     },
                //     {
                //         name: 'Sign up',
                //         link: 'sign-up/',
                //         type: 'login',
                //         show: true
                //     },
                //     {
                //         name: 'Sign in',
                //         link: '/sign-in',
                //         type: 'login',
                //         show: true
                //     },
                //
                // ],
                status: false,
            }

        },
        computed: {
            ...mapGetters({
                userSignIn: 'signInStatus'
            }),
        },
        methods: {
            logout() {
                this.$store.dispatch('logout', false)
            }
        }
    }
</script>
